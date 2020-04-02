import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import authMiddleware from './middleware/auth';
import * as UserValidators from './validators/UserValidators';

const routes = new Router();

// Unauthenticated routes
routes.post('/api/v1/users', UserValidators.signUp, UserController.store);
routes.post('/api/v1/sessions', UserValidators.login, SessionController.store);

routes.use(authMiddleware);

// Authenticated routes
routes.get('/api/v1/users', UserValidators.index, UserController.index);
routes.get('/api/v1/users/:id', UserValidators.get, UserController.get);
routes.put('/api/v1/users/:id', UserValidators.update, UserController.update);
routes.delete('/api/v1/users/:id', UserValidators.del, UserController.delete);

export default routes;
