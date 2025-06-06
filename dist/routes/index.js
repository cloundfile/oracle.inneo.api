"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../application/Authentication");
const Schedules_1 = require("../application/Schedules");
const Usuario_1 = require("../application/Usuario");
const login_1 = require("../middlewares/login");
const Roles_1 = require("../application/Roles");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const schedules = new Schedules_1.Schedules();
const usuario = new Usuario_1.Usuario();
const roles = new Roles_1.Roles();
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
//Horarios
routes.post('/v1/schedules/create', schedules.create);
routes.put('/v1/schedules/update', schedules.update);
routes.get('/v1/schedules/findall', schedules.findall);
routes.get('/v1/schedules/findOneBy', schedules.findOneBy);
routes.delete('/v1/schedules/delete', schedules.delete);
exports.default = routes;
