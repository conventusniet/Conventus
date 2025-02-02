import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { username, password } = req.body;

    try {
        if (username !== process.env.ADMIN_USERNAME ||
            password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                role: 'admin',
                exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
            },
            process.env.JWT_SECRET
        );

        setCookie('adminToken', token, {
            req,
            res,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600,
            path: '/',
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}