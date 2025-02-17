import { required, optional } from '../middlewares/login';
import { Router } from 'express';
const routes = Router();


import { Authentication } from '../application/Authentication';
import { Server } from '../application/Server';

const authentication = new Authentication();
const server = new Server();


routes.get('/', server.status);
routes.post('/api/login', authentication.login);

routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

export default routes