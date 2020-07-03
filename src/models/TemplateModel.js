import connection from '../connection';

export default {
  async create(template) {
    const [id] = await connection('templates').insert(template, 'id');

    return id;
  },

  async update(id, template) {
    const data = {
      ...template,
      updated_at: new Date(),
    };

    await connection('templates').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('templates').count();

    const templates = await connection('templates')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { templates, count };
  },

  async getBy(filter) {
    const [user] = await connection('templates').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('templates').where('id', id).select('*');

    return user;
  },

  async delete(id) {
    await connection('templates').where('id', id).delete();

    return true;
  },
};
