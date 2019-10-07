// eslint-disable-next-line import/no-unresolved
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Email não cadastrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não cadastrada' });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresId: authConfig.expireId,
      }),
    });
  }
}

export default new SessionController();
