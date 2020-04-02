import jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';

import authConfig from '../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await UserModel.getBy({ email });

    if (!user) {
      return response.status(401).json({
        statusCode: 401,
        error: 'User Not Found',
        message: '"email" not exists in our database',
        validation: {
          source: 'body',
          keys: ['email'],
        },
      });
    }

    if (!(await UserModel.checkPassword(user.password_hash, password))) {
      return response.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: '"password" senha inválida',
        validation: {
          source: 'body',
          keys: ['password'],
        },
      });
    }

    delete user.password_hash;

    await UserModel.update(user.id, { last_login: new Date() });

    return response.json({
      user,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
