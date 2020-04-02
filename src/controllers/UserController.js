import UserModel from '../database/models/UserModel';

class UserController {
  async store(request, response) {
    const userExists = await UserModel.getBy({ email: request.body.email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const id = await UserModel.create({
      password: request.body.password,
      name: request.body.name,
      email: request.body.email,
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
    });

    return response.json({ id });
  }

  async update(request, response) {
    const { id } = request.params;

    const user = {};

    if (request.body.name) {
    }

    await UserModel.update(id, {
      name: request.body.name,
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
    });

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

    return response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    const success = await UserModel.delete(id);

    if (!success) {
      return response.status(401).json({ error: 'Operation not allowed.' });
    }

    return response.send();
  }
}

export default new UserController();
