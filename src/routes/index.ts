import { Authentication } from '../application/Authentication';
import { required } from '../middlewares/login';
import { Roles } from '../application/Roles';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const roles = new Roles();

//Login api
routes.post('/api/login',           authentication.login);

//Usuario
routes.post('/api/usuario/create',   required, authentication.create);
routes.put('/api/usuario/update',    required, authentication.update);
routes.delete('/api/usuario/delete', required, authentication.delete);
routes.get('/api/usuario/findall',   required, authentication.findall);


//Roles
routes.get('/api/roles/findall',   roles.findAll);
routes.post('/api/roles/create',   required, roles.create);
routes.delete('/api/roles/delete', required, roles.delete);

export default routes