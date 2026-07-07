// Delegate portal: given a "verified" token from the email-OTP flow, return that
// delegate's own registration(s). The email is taken from the verified token (not the
// request body), so a delegate can only ever see their own data.
import jwt from 'jsonwebtoken';

const SECRET = process.env.REGISTRATION_SECRET;
const WEBHOOK = process.env.REGISTRATION_WEBHOOK_URL;
const ADMIN_KEY = process.env.ADMIN_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET || !WEBHOOK || !ADMIN_KEY) {
        return res.status(500).json({ error: 'The portal is not configured yet.' });
    }

    const { verifiedToken } = req.body || {};
    let payload;
    try {
        payload = jwt.verify(verifiedToken, SECRET);
    } catch {
        return res.status(401).json({ error: 'Please verify your email again.' });
    }
    if (payload.purpose !== 'verified') {
        return res.status(401).json({ error: 'Email verification required.' });
    }

    try {
        const r = await fetch(WEBHOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'lookup', email: payload.email, adminKey: ADMIN_KEY }),
        });
        if (!r.ok) throw new Error(`webhook ${r.status}`);
        const data = await r.json();
        return res.status(200).json({ email: payload.email, registrations: data.registrations || [] });
    } catch (err) {
        console.error('Status lookup error:', err);
        return res.status(502).json({ error: 'Could not fetch your registration right now.' });
    }
}
