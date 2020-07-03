import UserModel from '../database/models/UserModel';
import { objectSize } from '../utils/ObjectUtils';

class UserController {
  async store(request, response) {
    const userExists = await UserModel.getBy({ email: request.body.email });

    if (userExists) {
      return response.status(400).json({
        statusCode: 400,
        error: 'User already exists',
        message: '"email" Não disponível',
        validation: {
          source: 'body',
          keys: ['email'],
        },
      });
    }

    const id = await UserModel.create({
      password: request.body.password,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      whatsapp: request.body.whatsapp,
      birthday: request.body.birthday,
      city: request.body.city,
      uf: request.body.uf,
      country: request.body.country,
      street: request.body.street,
      neighborhood: request.body.neighborhood,
      number: request.body.number,
      reference: request.body.reference,
      zipcode: request.body.zipcode,
      complement: request.body.complement,
      role: request.body.role,
    });

    return response.json({ id });
  }

  async update(request, response) {
    const { id } = request.params;

    const userDb = await UserModel.get(id);

    if (!userDb) {
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

    const user = {};

    if (request.body.firstname && request.body.firstname !== userDb.firstname)
      user.firstname = request.body.firstname;
    if (request.body.lastname && request.body.lastname !== userDb.lastname)
      user.lastname = request.body.lastname;
    if (request.body.birthday && request.body.birthday !== userDb.birthday)
      user.birthday = request.body.birthday;
    if (request.body.city && request.body.city !== userDb.city)
      user.city = request.body.city;
    if (request.body.whatsapp && request.body.whatsapp !== userDb.whatsapp)
      user.whatsapp = request.body.whatsapp;
    if (request.body.uf && request.body.uf !== userDb.uf)
      user.uf = request.body.uf;
    if (request.body.country && request.body.country !== userDb.country)
      user.country = request.body.country;
    if (request.body.street && request.body.street !== userDb.street)
      user.street = request.body.street;
    if (
      request.body.neighborhood &&
      request.body.neighborhood !== userDb.neighborhood
    )
      user.neighborhood = request.body.neighborhood;
    if (request.body.number && request.body.number !== userDb.number)
      user.number = request.body.number;
    if (request.body.reference && request.body.reference !== userDb.reference)
      user.reference = request.body.reference;
    if (request.body.zipcode && request.body.zipcode !== userDb.zipcode)
      user.zipcode = request.body.zipcode;
    if (
      request.body.complement &&
      request.body.complement !== userDb.complement
    )
      user.complement = request.body.complement;
    if (request.body.role && request.body.role !== userDb.role)
      user.role = request.body.role;

    if (objectSize(user) === 0) {
      return response.status(304).json({
        statusCode: 304,
        error: 'Nothing changed',
        message: 'Nenhuma alteração encontrada',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    await UserModel.update(id, user);

    return response.json({ id });
  }

  async index(request, response) {
    const { page = 1, include = 10 } = request.query;

    const { users, count } = await UserModel.getAll(page, include);

    response.header('X-Total-Count', count);

    return response.json(users);
  }

  async get(request, response) {
    const { id } = request.params;

    const user = await UserModel.get(id);

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

    delete user.password_hash;

    return response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await UserModel.get(id);

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

    const success = await UserModel.delete(id);

    if (!success) {
      return response.status(401).json({ error: 'Operation not allowed.' });
    }

    return response.send();
  }
}

export default new UserController();
