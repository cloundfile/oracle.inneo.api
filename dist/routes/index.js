"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../application/Authentication");
const login_1 = require("../middlewares/login");
const Roles_1 = require("../application/Roles");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const roles = new Roles_1.Roles();
//Login api
routes.post('/auth/login', authentication.login);
//Usuario
routes.post('/v1/usuario/create', login_1.required, authentication.create);
routes.put('/v1/usuario/update', login_1.required, authentication.update);
routes.delete('/v1/usuario/delete', login_1.required, authentication.delete);
routes.get('/v1/usuario/findall', login_1.required, authentication.findall);
//Roles
routes.get('/v1/roles/findall', roles.findAll);
routes.post('/v1/roles/create', login_1.required, roles.create);
routes.delete('/v1/roles/delete', login_1.required, roles.delete);
exports.default = routes;
