import { required, optional } from '../middlewares/login';
import { Router } from 'express';
const routes = Router();


import { Authentication } from '../application/Authentication';

const authentication = new Authentication();

routes.post('/api/login', authentication.login);

routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

export default routes