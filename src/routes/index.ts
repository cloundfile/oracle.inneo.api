import { Authentication } from '../application/Authentication';
import { Usuario } from '../application/Usuario';
import { required } from '../middlewares/login';
import { Roles } from '../application/Roles';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const usuario = new Usuario();
const roles = new Roles();

//Login authentication
routes.post('/auth/login',          authentication.login);

//Usuario
routes.post('/v1/usuario/create',   required, usuario.create);
routes.put('/v1/usuario/update',    required, usuario.update);
routes.delete('/v1/usuario/delete', required, usuario.delete);
routes.get('/v1/usuario/findall',   required, usuario.findall);


//Roles
routes.get('/v1/roles/findall',   roles.findAll);
routes.post('/v1/roles/create',   required, roles.create);
routes.delete('/v1/roles/delete', required, roles.delete);

export default routes