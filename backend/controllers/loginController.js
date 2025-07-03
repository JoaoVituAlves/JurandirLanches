import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/usuarioModel.js';

const JWT_SECRET = 'seuSegredoSuperSeguroAqui';

export default class LoginController {
  async autenticar(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ msg: 'Requisição inválida' });
    }

    const usuario = new UsuarioModel();
    const autenticou = await usuario.autenticar(email, senha);

    if (!autenticou) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    const token = jwt.sign(
      { id: autenticou.id, email: autenticou.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('cookieAuth', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,  // true se estiver usando HTTPS em produção
      maxAge: 3600000 // 1 hora em ms
    });

    res.status(200).json({ msg: 'Usuário autenticado!' });
  }
}
