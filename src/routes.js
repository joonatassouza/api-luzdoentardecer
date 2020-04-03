import { Router } from 'express';

import authMiddleware from './middleware/auth';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import CategoryController from './controllers/CategoryController';
import PostController from './controllers/PostController';

import * as UserValidators from './validators/UserValidators';
import * as CategoryValidators from './validators/CategoryValidators';
import * as PostValidators from './validators/PostValidators';

const routes = new Router();

// Unauthenticated routes
routes.post('/api/v1/users', UserValidators.signUp, UserController.store);

routes.post('/api/v1/sessions', UserValidators.login, SessionController.store);

routes.get(
  '/api/v1/categories',
  CategoryValidators.index,
  CategoryController.index
);
routes.get(
  '/api/v1/categories/:id',
  CategoryValidators.get,
  CategoryController.get
);

routes.get('/api/v1/posts', PostValidators.index, PostController.index);
routes.get('/api/v1/posts/:id', PostValidators.get, PostController.get);

routes.use(authMiddleware);

// Authenticated routes
routes.get('/api/v1/users', UserValidators.index, UserController.index);
routes.get('/api/v1/users/:id', UserValidators.get, UserController.get);
routes.put('/api/v1/users/:id', UserValidators.update, UserController.update);
routes.delete('/api/v1/users/:id', UserValidators.del, UserController.delete);

routes.post(
  '/api/v1/categories',
  CategoryValidators.create,
  CategoryController.store
);
routes.put(
  '/api/v1/categories/:id',
  CategoryValidators.update,
  CategoryController.update
);
routes.delete(
  '/api/v1/categories/:id',
  CategoryValidators.del,
  CategoryController.delete
);

routes.post('/api/v1/posts', PostValidators.create, PostController.store);
routes.put('/api/v1/posts/:id', PostValidators.update, PostController.update);
routes.delete('/api/v1/posts/:id', PostValidators.del, PostController.delete);

// TEMP
routes.get('/api/v1/import/categories', CategoryController.import);
routes.get('/api/v1/import/posts/:categoryId', CategoryController.importPosts);

export default routes;
