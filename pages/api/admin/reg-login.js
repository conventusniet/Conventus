// Admin login for the registrations dashboard. Checks the shared username/password
// and issues an httpOnly JWT cookie (signed with REGISTRATION_SECRET), valid 8h.
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

const SECRET = process.env.REGISTRATION_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!SECRET || !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
        console.error('Admin auth env not configured');
        return res.status(500).json({ error: 'Admin login is not configured yet.' });
    }

    const { username, password } = req.body || {};
    if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ role: 'regadmin' }, SECRET, { expiresIn: '8h' });
    setCookie('regAdminToken', token, {
        req, res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 8 * 3600,
        path: '/',
    });
    return res.status(200).json({ ok: true });
}
