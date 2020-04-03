import api from '../services/wordpressApi';

import PostModel from '../database/models/PostModel';
import { objectSize } from '../utils/ObjectUtils';

class PostController {
  async store(request, response) {
    const id = await PostModel.create({
      publish_date: request.body.publish_date,
      title: request.body.title,
      description: request.body.description,
      subtitle: request.body.subtitle,
      content: request.body.content,
      footer: request.body.footer,
      references: request.body.references,
      author: request.body.author,
      category_id: request.body.category_id,
      type: request.body.type,
      user_id: request.body.user_id,
    });

    return response.json({ id });
  }

  async update(request, response) {
    const { id } = request.params;

    const postDb = await PostModel.get(id);

    if (!postDb) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Post Not Found',
        message: '"*" Não encontrado',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    const post = {};

    if (request.body.publish_date)
      post.publish_date = request.body.publish_date;
    if (request.body.title) post.title = request.body.title;
    if (request.body.description) post.description = request.body.description;
    if (request.body.subtitle) post.subtitle = request.body.subtitle;
    if (request.body.content) post.content = request.body.content;
    if (request.body.footer) post.footer = request.body.footer;
    if (request.body.references) post.references = request.body.references;
    if (request.body.author) post.author = request.body.author;
    if (request.body.category_id) post.category_id = request.body.category_id;
    if (request.body.type) post.type = request.body.type;
    if (request.body.user_id) post.user_id = request.body.user_id;

    if (objectSize(post) === 0) {
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

    await PostModel.update(id, post);

    return response.json({ id });
  }

  async index(request, response) {
    const { page = 1, include = 10 } = request.query;

    const { posts, count } = await PostModel.getAll(page, include);

    response.header('X-Total-Count', count);

    return response.json(posts);
  }

  async get(request, response) {
    const { id } = request.params;

    const post = await PostModel.get(id);

    if (!post) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Post Not Found',
        message: '"*" Não encontrado',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    delete post.password_hash;

    return response.json(post);
  }

  async delete(request, response) {
    const { id } = request.params;

    const post = await PostModel.get(id);

    if (!post) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Post Not Found',
        message: '"*" Não encontrado',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    const success = await PostModel.delete(id);

    if (!success) {
      return response.status(401).json({ error: 'Operation not allowed.' });
    }

    return response.send();
  }
}

export default new PostController();
