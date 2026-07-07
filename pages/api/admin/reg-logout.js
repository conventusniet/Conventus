import { deleteCookie } from 'cookies-next';

export default async function handler(req, res) {
    deleteCookie('regAdminToken', { req, res, path: '/' });
    return res.status(200).json({ ok: true });
}
