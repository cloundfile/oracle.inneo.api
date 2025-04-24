import { Authentication } from '../application/Authentication';
import { Horarios } from '../application/Horarios';
import { Usuario } from '../application/Usuario';
import { required } from '../middlewares/login';
import { Pontos } from '../application/Pontos';
import { Roles } from '../application/Roles';
import { Rotas } from '../application/Rotas';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const horarios = new Horarios();
const usuario = new Usuario();
const pontos = new Pontos();
const roles = new Roles();
const rotas = new Rotas();

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

//Rotas
routes.post('/v1/rotas/create',     rotas.create);
routes.get('/v1/rotas/findall',     rotas.findAll);
routes.get('/v1/rotas/findby',      rotas.findBy);
routes.delete('/v1/rotas/delete',   rotas.delete);

//Pontos
routes.post('/v1/pontos/create',    pontos.create);
routes.get('/v1/pontos/findall',    pontos.findAll);
routes.get('/v1/pontos/findby',     pontos.findBy);
routes.delete('/v1/pontos/delete',  pontos.delete);

//Horarios
routes.post('/v1/horarios/create',    horarios.create);
routes.get('/v1/horarios/findall',    horarios.findAll);
routes.get('/v1/horarios/findby',     horarios.findBy);
routes.delete('/v1/horarios/delete',  horarios.delete);

export default routes