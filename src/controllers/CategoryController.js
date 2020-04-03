import api from '../services/wordpressApi';

import CategoryModel from '../database/models/CategoryModel';
import { objectSize } from '../utils/ObjectUtils';

class CategoryController {
  async store(request, response) {
    const categoryExists = await CategoryModel.getBy({ tag: request.body.tag });

    if (categoryExists) {
      return response.status(400).json({
        statusCode: 400,
        error: 'Category already exists',
        message: '"tag" já existe uma tag cadastrada com esse nome',
        validation: {
          source: 'body',
          keys: ['tag'],
        },
      });
    }

    const id = await CategoryModel.create({
      wordpress_id: request.body.wordpress_id,
      name: request.body.name,
      description: request.body.description,
      tag: request.body.tag,
      parent_id: request.body.parent_id,
    });

    return response.json({ id });
  }

  async update(request, response) {
    const { id } = request.params;

    const categoryDb = await CategoryModel.get(id);

    if (!categoryDb) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Category Not Found',
        message: '"*" Não encontrada',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    const category = {};

    if (request.body.wordpress_id)
      category.wordpress_id = request.body.wordpress_id;
    if (request.body.name) category.name = request.body.name;
    if (request.body.description)
      category.description = request.body.description;
    if (request.body.tag) category.tag = request.body.tag;
    if (request.body.parent_id) category.parent_id = request.body.parent_id;

    if (objectSize(category) === 0) {
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

    await CategoryModel.update(id, category);

    return response.json({ id });
  }

  async index(request, response) {
    const { page = 1, include = 10 } = request.query;

    const { categories, count } = await CategoryModel.getAll(page, include);

    response.header('X-Total-Count', count);

    return response.json(categories);
  }

  async get(request, response) {
    const { id } = request.params;

    const category = await CategoryModel.get(id);

    if (!category) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Category Not Found',
        message: '"*" Não encontrado',
        validation: {
          source: 'body',
          keys: ['*'],
        },
      });
    }

    delete category.password_hash;

    return response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoryModel.get(id);

    if (!category) {
      return response.status(401).json({
        statusCode: 401,
        error: 'Category Not Found',
        message: '"*" Não encontrada',
        validation: {
          source: 'body',
          keys: ['email'],
        },
      });
    }

    const success = await CategoryModel.delete(id);

    if (!success) {
      return response.status(401).json({ error: 'Operation not allowed.' });
    }

    return response.send();
  }

  async import(request, response) {
    let { data } = await api.get('/categories?per_page=100');

    data = data.map((cat) => ({
      wordpress_id: cat.id,
      name: cat.name,
      description: cat.description,
      tag: cat.slug,
      parent_id: cat.parent,
      count: cat.count,
    }));

    return response.json({ count: data.length, data });
  }
}

export default new CategoryController();
