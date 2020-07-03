import connection from '../connection';

export default {
  async create(postAttachment) {
    const [id] = await connection('post_attachment').insert(
      postAttachment,
      'id'
    );

    return id;
  },

  async update(id, postAttachment) {
    const data = {
      ...postAttachment,
      updated_at: new Date(),
    };

    await connection('post_attachment').where('id', id).update(data, 'id');

    return id;
  },

  async getAll(page = 1, include = 10) {
    const [{ count }] = await connection('post_attachment').count();

    const post_attachment = await connection('post_attachment')
      .limit(include)
      .offset((page - 1) * include)
      .select('*');

    return { post_attachment, count };
  },

  async getBy(filter) {
    const [user] = await connection('post_attachment')
      .where(filter)
      .select('*');

    return user;
  },

  async get(id) {
    const [user] = await connection('post_attachment')
      .where('id', id)
      .select('*');

    return user;
  },

  async delete(id) {
    await connection('post_attachment').where('id', id).delete();

    return true;
  },
};
