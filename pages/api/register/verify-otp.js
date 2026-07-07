// Step 2 of email verification: check the user's 6-digit code against the challenge
// token from send-otp. On success, return a longer-lived "verified" token that the
// submit route requires — proving this email was verified in this session.
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET = process.env.REGISTRATION_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET) {
        console.error('REGISTRATION_SECRET is not configured');
        return res.status(500).json({ error: 'Registration is not configured yet.' });
    }

    const { token, otp } = req.body || {};
    if (!token || !otp) {
        return res.status(400).json({ error: 'The verification code is required.' });
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET);
    } catch {
        return res.status(400).json({ error: 'Your code has expired. Please request a new one.' });
    }
    if (payload.purpose !== 'otp') {
        return res.status(400).json({ error: 'Invalid verification session.' });
    }

    const expected = crypto
        .createHmac('sha256', SECRET)
        .update(`${payload.email}:${String(otp).trim()}`)
        .digest('hex');
    const a = Buffer.from(expected);
    const b = Buffer.from(payload.otpHash);
    const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
    if (!ok) {
        return res.status(400).json({ error: 'Incorrect code. Please check and try again.' });
    }

    const verifiedToken = jwt.sign({ email: payload.email, purpose: 'verified' }, SECRET, { expiresIn: '40m' });
    return res.status(200).json({ verifiedToken });
}
