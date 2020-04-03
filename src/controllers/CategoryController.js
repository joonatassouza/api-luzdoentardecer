import api from '../services/wordpressApi';

import CategoryModel from '../database/models/CategoryModel';
import { objectSize } from '../utils/ObjectUtils';
import * as StringUtils from '../utils/StringUtils';

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

  async importPosts(request, response) {
    function getContentInfo(post) {
      let wordpress_content = '';
      let wordpress_description = '';
      let content = '';
      let description = '';
      let type = 'post';

      if (post.excerpt && post.excerpt.rendered) {
        wordpress_description = post.excerpt.rendered;
        description = StringUtils.clearString(post.excerpt.rendered);
      }

      if (post.content && post.content.rendered) {
        wordpress_content = post.content.rendered;
        let text = StringUtils.clearString(post.content.rendered);

        if (post.content.rendered.indexOf('www.youtube.com/embed') > -1) {
          text = StringUtils.extractUrlYoutubeEmbed(post.content.rendered);

          if (text) {
            type = 'youtube';
          }
        }

        if (text) {
          content = text;
        }
      }

      const title = StringUtils.clearString(post.title && post.title.rendered);

      const category_id =
        Array.isArray(post.categories) && post.categories.length > 0
          ? post.categories[0]
          : post.categories;

      const author =
        post._embedded &&
        post._embedded.author &&
        post._embedded.author[0] &&
        post._embedded.author[0].name;

      return {
        title,
        content,
        type,
        category_id,
        author,
        description,
        wordpress_content,
        wordpress_description,
      };
    }

    let posts = [];
    let lastPostsLength = 0;
    let page = 1;

    do {
      let { data } = await api.get(
        `/posts?categories=${request.params.categoryId}&_embed=1&per_page=100&page=${page}`
      );

      data = data.map((post) => {
        const contentInfo = getContentInfo(post);

        return {
          wordpress_id: post.id,
          publish_date: post.date_gmt,
          title: contentInfo.title,
          content: contentInfo.content,
          type: contentInfo.type,
          author: contentInfo.author,
          category_id: contentInfo.category_id,
          user_id: request.userId,
          description: contentInfo.description,
          wordpress_content: contentInfo.wordpress_content,
          wordpress_description: contentInfo.wordpress_description,
        };
      });

      posts = posts.concat(data);
      lastPostsLength = data.length;
      page++;
    } while (lastPostsLength === 100);

    return response.json({ count: posts.length, data: posts });
  }
}

export default new CategoryController();
