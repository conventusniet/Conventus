import { deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    deleteCookie('adminToken', {
        req,
        res,
        path: '/',
    });

    res.status(200).json({ success: true });
}