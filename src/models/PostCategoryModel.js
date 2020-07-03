import connection from '../connection';

export default {
  async create(postCategory) {
    const [id] = await connection('post_category').insert(postCategory, 'id');

    return id;
  },

  async update(id, postCategory) {
    const data = {
      ...postCategory,
      updated_at: new Date(),
    };

    await connection('post_category').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('post_category').count();

    const post_category = await connection('post_category')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { post_category, count };
  },

  async getBy(filter) {
    const [user] = await connection('post_category').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('post_category')
      .where('id', id)
      .select('*');

    return user;
  },

  async delete(id) {
    await connection('post_category').where('id', id).delete();

    return true;
  },
};
