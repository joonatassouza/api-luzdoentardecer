import connection from '../connection';

export default {
  async create(attatchment) {
    const [id] = await connection('attatchments').insert(attatchment, 'id');

    return id;
  },

  async update(id, attatchment) {
    const data = {
      ...attatchment,
      updated_at: new Date(),
    };

    await connection('attatchments').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('attatchments').count();

    const attatchments = await connection('attatchments')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { attatchments, count };
  },

  async getBy(filter) {
    const [user] = await connection('attatchments').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('attatchments').where('id', id).select('*');

    return user;
  },

  async delete(id) {
    await connection('attatchments').where('id', id).delete();

    return true;
  },
};
