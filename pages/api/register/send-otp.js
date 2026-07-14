// Step 1 of email verification: generate a 6-digit OTP, email it via Brevo, and return a
// short-lived signed "challenge" token. The OTP itself is never sent to the client — only
// its HMAC, inside the JWT.
//
// Mail goes out from noreply@conventusmun.com (DKIM-signed, DMARC-aligned). This replaced
// Google Apps Script MailApp, whose free-Gmail sender was being filtered by NIET's
// Microsoft 365 (Exchange Online) inbound spam filter, so @niet.co.in never got the code.
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET = process.env.REGISTRATION_SECRET;
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const BREVO_URL = 'https://api.brevo.com/v3/smtp/email';
const FROM = { name: 'Conventus MUN', email: 'noreply@conventusmun.com' };
// conventusmun.com has no MX record, so it cannot receive mail — point replies somewhere real.
const REPLY_TO = { name: 'Conventus MUN', email: 'conventus@niet.co.in' };
const LOGO_URL = 'https://www.conventusmun.com/logo.png';

const otpEmailHtml = (name, otp) => `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1C1917">
  <div style="text-align:center;padding-bottom:20px;border-bottom:1px solid #E7E5E4">
    <img src="${LOGO_URL}" alt="Conventus" width="64" height="64" style="display:inline-block" />
    <p style="margin:8px 0 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#AA172C;font-weight:bold">Conventus MUN</p>
  </div>
  <p style="font-size:15px">Hi ${name || 'there'},</p>
  <p style="font-size:15px">Your verification code for <strong>CMUN Connect</strong> registration is:</p>
  <p style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#AA172C;text-align:center;margin:24px 0">${otp}</p>
  <p style="font-size:14px;color:#57534E">This code expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
  <p style="font-size:12px;color:#A8A29E;margin-top:28px;border-top:1px solid #E7E5E4;padding-top:14px">
    Conventus &mdash; Model United Nations Society, NIET Greater Noida
  </p>
</div>`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET) {
        console.error('REGISTRATION_SECRET is not configured');
        return res.status(500).json({ error: 'Registration is not configured yet.' });
    }
    if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY is not configured');
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
        const upstream = await fetch(BREVO_URL, {
            method: 'POST',
            headers: {
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({
                sender: FROM,
                to: [{ email: cleanEmail, name: name || cleanEmail }],
                replyTo: REPLY_TO,
                subject: 'Your CMUN Connect verification code',
                htmlContent: otpEmailHtml(name, otp),
            }),
        });

        if (upstream.ok) return res.status(200).json({ token });

        // Out of daily credits / rate limited.
        if (upstream.status === 402 || upstream.status === 429) {
            return res.status(429).json({
                error: "Today's registration limit has been reached. Please try again tomorrow.",
                limitReached: true,
            });
        }
        const detail = await upstream.text().catch(() => '');
        console.error('Brevo send failed', upstream.status, detail.slice(0, 200));
        return res.status(502).json({ error: 'Could not send the verification email. Please try again.' });
    } catch (err) {
        console.error('Brevo request error:', err);
        return res.status(502).json({ error: 'Could not reach the email service.' });
    }
}
