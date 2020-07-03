import connection from '../connection';

export default {
  async create(post) {
    const [id] = await connection('posts').insert(post, 'id');

    return id;
  },

  async update(id, post) {
    const data = {
      ...post,
      updated_at: new Date(),
    };

    await connection('posts').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('posts').count();

    const posts = await connection('posts')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { posts, count };
  },

  async getBy(filter) {
    const [user] = await connection('posts').where(filter).select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('posts').where('id', id).select('*');

    return user;
  },

  async delete(id) {
    await connection('posts').where('id', id).delete();

    return true;
  },
};
