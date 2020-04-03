import connection from '../connection';

export default {
  async create(post) {
    const data = {
      wordpress_id: post.wordpress_id,
      wordpress_description: post.wordpress_description,
      wordpress_content: post.wordpress_content,

      publish_date: post.publish_date,
      title: post.title,
      description: post.description,
      subtitle: post.subtitle,
      content: post.content,
      footer: post.footer,
      references: post.references,
      author: post.author,
      category_id: post.category_id,
      user_id: post.user_id,
      type: post.type,
    };

    if (post.created_at) {
      data.created_at = post.created_at;
    }

    if (post.updated_at) {
      data.updated_at = post.updated_at;
    }

    const [id] = await connection('posts').insert(data, 'id');

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
