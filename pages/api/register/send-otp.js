// Step 1 of email verification: generate a 6-digit OTP, email it to the user via
// the Google Apps Script webhook, and return a short-lived signed "challenge" token.
// The OTP itself is never sent to the client — only its HMAC, inside the JWT.
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET = process.env.REGISTRATION_SECRET;
const WEBHOOK = process.env.REGISTRATION_WEBHOOK_URL;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET) {
        console.error('REGISTRATION_SECRET is not configured');
        return res.status(500).json({ error: 'Registration is not configured yet.' });
    }
    if (!WEBHOOK) {
        console.error('REGISTRATION_WEBHOOK_URL is not configured');
        return res.status(500).json({ error: 'Email verification is not configured yet.' });
    }

    const { email, name } = req.body || {};
    const cleanEmail = String(email || '').trim().toLowerCase();
    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const otp = String(crypto.randomInt(100000, 1000000)); // 6 digits
    const otpHash = crypto.createHmac('sha256', SECRET).update(`${cleanEmail}:${otp}`).digest('hex');
    const token = jwt.sign({ email: cleanEmail, otpHash, purpose: 'otp' }, SECRET, { expiresIn: '10m' });

    try {
        const upstream = await fetch(WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'sendOtp', email: cleanEmail, name: name || '', otp }),
        });
        if (!upstream.ok) {
            console.error('OTP mail webhook responded', upstream.status);
            return res.status(502).json({ error: 'Could not send the verification email. Please try again.' });
        }
        const data = await upstream.json().catch(() => ({}));
        if (data.error === 'daily_limit') {
            return res.status(429).json({
                error: "Today's registration limit has been reached. Please try again tomorrow.",
                limitReached: true,
            });
        }
        if (data.error) {
            console.error('OTP webhook error:', data.error);
            return res.status(502).json({ error: 'Could not send the verification email. Please try again.' });
        }
    } catch (err) {
        console.error('OTP mail error:', err);
        return res.status(502).json({ error: 'Could not reach the email service.' });
    }

    return res.status(200).json({ token });
}
