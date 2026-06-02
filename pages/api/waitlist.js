// Server-side proxy for the CMUN Connect waitlist.
// Forwards submissions to a Google Apps Script web app (a Google Sheet).
// The webhook URL is kept server-side in WAITLIST_WEBHOOK_URL — never exposed to the client.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const webhook = process.env.WAITLIST_WEBHOOK_URL;
    if (!webhook) {
        console.error('WAITLIST_WEBHOOK_URL is not configured');
        return res.status(500).json({ error: 'The waitlist is not configured yet.' });
    }

    const { name, email, institution, interest, company } = req.body || {};

    // Honeypot: real users never fill the hidden "company" field — silently accept & drop bots.
    if (company) return res.status(200).json({ ok: true });

    if (!name?.trim() || !email?.trim() || !institution?.trim() || !interest) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    try {
        const upstream = await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                institution: institution.trim(),
                interest,
                submittedAt: new Date().toISOString(),
            }),
        });

        if (!upstream.ok) {
            console.error('Waitlist webhook responded', upstream.status);
            return res.status(502).json({ error: 'Could not save your entry. Please try again.' });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Waitlist proxy error:', err);
        return res.status(500).json({ error: 'Could not reach the waitlist service.' });
    }
}
