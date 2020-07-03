import connection from '../connection';

export default {
  async create(category) {
    const [id] = await connection('categories').insert(category, 'id');

    return id;
  },

  async update(id, category) {
    const data = {
      ...category,
      updated_at: new Date(),
    };

    await connection('categories').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('categories').count();

    const categories = await connection('categories')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { categories, count };
  },

  async getBy(filter) {
    const [user] = await connection('categories').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('categories').where('id', id).select('*');

    return user;
  },

  async delete(id) {
    await connection('categories').where('id', id).delete();

    return true;
  },
};
