"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../application/Authentication");
const Horarios_1 = require("../application/Horarios");
const Usuario_1 = require("../application/Usuario");
const login_1 = require("../middlewares/login");
const Pontos_1 = require("../application/Pontos");
const Roles_1 = require("../application/Roles");
const Rotas_1 = require("../application/Rotas");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const horarios = new Horarios_1.Horarios();
const usuario = new Usuario_1.Usuario();
const pontos = new Pontos_1.Pontos();
const roles = new Roles_1.Roles();
const rotas = new Rotas_1.Rotas();
//Login authentication
routes.post('/auth/login', authentication.login);
//Usuario
routes.post('/v1/usuario/create', login_1.required, usuario.create);
routes.put('/v1/usuario/update', login_1.required, usuario.update);
routes.delete('/v1/usuario/delete', login_1.required, usuario.delete);
routes.get('/v1/usuario/findall', login_1.required, usuario.findall);
//Roles
routes.get('/v1/roles/findall', roles.findAll);
routes.post('/v1/roles/create', login_1.required, roles.create);
routes.delete('/v1/roles/delete', login_1.required, roles.delete);
//Rotas
routes.post('/v1/rotas/create', rotas.create);
routes.get('/v1/rotas/findall', rotas.findAll);
routes.get('/v1/rotas/findby', rotas.findBy);
routes.delete('/v1/rotas/delete', rotas.delete);
//Pontos
routes.post('/v1/pontos/create', pontos.create);
routes.get('/v1/pontos/findall', pontos.findAll);
routes.get('/v1/pontos/findby', pontos.findBy);
routes.delete('/v1/pontos/delete', pontos.delete);
//Horarios
routes.post('/v1/horarios/create', horarios.create);
routes.get('/v1/horarios/findall', horarios.findAll);
routes.get('/v1/horarios/findby', horarios.findBy);
routes.delete('/v1/horarios/delete', horarios.delete);
exports.default = routes;
