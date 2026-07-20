// Final step: validate the registration, confirm the email was verified in this
// session (via the verified token), then forward everything — including the payment
// screenshot — to the Google Apps Script webhook, which stores it in a Sheet + Drive.
import jwt from 'jsonwebtoken';
import { feeForEmail } from '../../../lib/registration-config';

const SECRET = process.env.REGISTRATION_SECRET;
const WEBHOOK = process.env.REGISTRATION_WEBHOOK_URL;

// Payment screenshots are base64 in the JSON body — raise the default 1mb cap.
export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };

const REQUIRED = ['name', 'email', 'phone', 'institution', 'role', 'experience'];
// Delegates represent a country in a committee, so a committee is mandatory for them.
// International Press cover the conference instead, so it stays optional.
const DELEGATE_REQUIRED = ['committee1'];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET || !WEBHOOK) {
        console.error('Registration env not configured');
        return res.status(500).json({ error: 'Registration is not configured yet.' });
    }

    const { verifiedToken, screenshot, screenshotName, ...form } = req.body || {};

    // Prove the email was verified this session, and that it matches the form email.
    let payload;
    try {
        payload = jwt.verify(verifiedToken, SECRET);
    } catch {
        return res.status(401).json({ error: 'Please verify your email again before submitting.' });
    }
    if (payload.purpose !== 'verified') {
        return res.status(401).json({ error: 'Email verification is required.' });
    }
    if (String(form.email || '').trim().toLowerCase() !== payload.email) {
        return res.status(400).json({ error: 'Email mismatch. Please restart the registration.' });
    }

    const required = String(form.role || '').trim() === 'International Press'
        ? REQUIRED
        : [...REQUIRED, ...DELEGATE_REQUIRED];
    for (const field of required) {
        if (!String(form[field] || '').trim()) {
            return res.status(400).json({ error: `Please complete all required fields (${field}).` });
        }
    }
    const digits = String(form.phone).replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 12) {
        return res.status(400).json({ error: 'Please enter a valid phone number.' });
    }
    if (!screenshot || !/^data:image\/(png|jpe?g|webp);base64,/.test(screenshot)) {
        return res.status(400).json({ error: 'Please attach your payment screenshot (PNG or JPG).' });
    }
    if (screenshot.length > 4_400_000) {
        return res.status(413).json({ error: 'Screenshot is too large. Please keep it under 3MB.' });
    }

    // Fee is derived from the verified email domain here — never trusted from the client.
    const { category: feeCategory, amount: feeAmount } = feeForEmail(payload.email);

    try {
        const upstream = await fetch(WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'register',
                ...form,
                email: payload.email,
                feeCategory,
                feeAmount,
                screenshot,
                screenshotName: screenshotName || 'payment.png',
                emailVerified: true,
                submittedAt: new Date().toISOString(),
            }),
        });
        if (!upstream.ok) {
            console.error('Register webhook responded', upstream.status);
            return res.status(502).json({ error: 'Could not save your registration. Please try again.' });
        }
        const data = await upstream.json().catch(() => ({}));
        return res.status(200).json({ ok: true, registrationId: data.registrationId || null });
    } catch (err) {
        console.error('Register proxy error:', err);
        return res.status(502).json({ error: 'Could not reach the registration service.' });
    }
}
