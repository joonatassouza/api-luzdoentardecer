import jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';

import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.getBy({
      email,
    });

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        error: 'User Not Found',
        message: '"email" not exists in our database',
        validation: {
          source: 'body',
          keys: ['email'],
        },
      });
    }

    if (!(await UserModel.checkPassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    delete user.password_hash;

    await UserModel.update(user.id, { last_login: new Date() });

    return res.json({
      user,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
