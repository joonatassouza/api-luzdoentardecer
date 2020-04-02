import bcrypt from 'bcryptjs';
import connection from '../connection';

export default {
  async create(user) {
    user.password_hash = await bcrypt.hash(user.password, 8);

    const [id] = await connection('users').insert(
      {
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        city: user.city,
        uf: user.uf,
        country: user.country,
        street: user.street,
        neighborhood: user.neighborhood,
        number: user.number,
        reference: user.reference,
        zipcode: user.zipcode,
        complement: user.complement,
        password_hash: user.password_hash,
      },
      'id'
    );

    return id;
  },

  async update(id, user) {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
      delete user.password;
    }

    const userToUpdate = {
      ...user,
      updated_at: new Date(),
    };

    const [id] = await connection('users')
      .where('id', id)
      .update(userToUpdate, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('users').count();

    const users = await connection('users')
      .limit(include)
      .offset((page - 1) * include)
      .select(['id', 'name', 'birthday', 'city', 'uf', 'country']);

    return { users, count };
  },

  async getBy(filter) {
    const [user] = await connection('users').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('users').where('id', id).select('*');

    return user;
  },

  async delete(id) {
    await connection('users').where('id', id).delete();

    return true;
  },

  checkPassword(dbPassword, password) {
    return bcrypt.compare(password, dbPassword);
  },
};
