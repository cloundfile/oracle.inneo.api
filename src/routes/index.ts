import { Authentication } from '../application/Authentication';
import { required } from '../middlewares/login';
import { Roles } from '../application/Roles';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const roles = new Roles();

//Login api
routes.post('/auth/login',           authentication.login);

//Usuario
routes.post('/v1/usuario/create',   required, authentication.create);
routes.put('/v1/usuario/update',    required, authentication.update);
routes.delete('/v1/usuario/delete', required, authentication.delete);
routes.get('/v1/usuario/findall',   required, authentication.findall);


//Roles
routes.get('/v1/roles/findall',   roles.findAll);
routes.post('/v1/roles/create',   required, roles.create);
routes.delete('/v1/roles/delete', required, roles.delete);

export default routes