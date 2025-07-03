import jwt from 'jsonwebtoken';
const JWT_SECRET = 'seuSegredoSuperSeguroAqui';

export default class AuthMiddleware {
  verificarUsuarioLogado(req, res, next) {
    const token = req.cookies.cookieAuth;
    if (!token) {
      return res.status(401).json({ msg: 'Não autenticado (cookie ausente)' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuario = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Token inválido ou expirado' });
    }
  }
}
