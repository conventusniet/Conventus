// Admin-only: read all registrations (GET) and update a registration's status (POST).
// Requires the regAdminToken cookie, then calls the Apps Script with the shared ADMIN_KEY
// so the public webhook only returns data to our authenticated server.
import jwt from 'jsonwebtoken';

const SECRET = process.env.REGISTRATION_SECRET;
const WEBHOOK = process.env.REGISTRATION_WEBHOOK_URL;
const ADMIN_KEY = process.env.ADMIN_KEY;

const STATUSES = ['Pending Verification', 'Verified', 'Rejected'];

function isAdmin(req) {
    const token = req.cookies?.regAdminToken;
    if (!token || !SECRET) return false;
    try {
        return jwt.verify(token, SECRET).role === 'regadmin';
    } catch {
        return false;
    }
}

async function callWebhook(payload) {
    const r = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, adminKey: ADMIN_KEY }),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
    return r.json();
}

export default async function handler(req, res) {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Not authorized' });
    if (!WEBHOOK || !ADMIN_KEY) {
        return res.status(500).json({ error: 'Admin backend is not configured yet.' });
    }

    try {
        if (req.method === 'GET') {
            const data = await callWebhook({ action: 'list' });
            return res.status(200).json(data);
        }
        if (req.method === 'POST') {
            const { regId, status } = req.body || {};
            if (!regId || !STATUSES.includes(status)) {
                return res.status(400).json({ error: 'A regId and a valid status are required.' });
            }
            const data = await callWebhook({ action: 'updateStatus', regId, status });
            return res.status(200).json(data);
        }
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error('Admin registrations error:', err);
        return res.status(502).json({ error: 'Could not reach the registrations backend.' });
    }
}
