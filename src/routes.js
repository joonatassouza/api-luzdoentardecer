import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import CategoryController from './controllers/CategoryController';
import authMiddleware from './middleware/auth';
import * as UserValidators from './validators/UserValidators';
import * as CategoryValidators from './validators/CategoryValidators';

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

// TEMP
routes.get('/api/v1/import/categories', CategoryController.import);

export default routes;
