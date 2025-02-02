export default function handler(req, res) {
    const token = getCookie('adminToken', { req, res });
    res.status(token ? 200 : 401).json({ valid: !!token });
  }