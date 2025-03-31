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
routes.post('/api/login', authentication.login);
//Usuario
routes.post('/api/usuario/create', login_1.required, authentication.create);
routes.put('/api/usuario/update', login_1.required, authentication.update);
routes.delete('/api/usuario/delete', login_1.required, authentication.delete);
routes.get('/api/usuario/findall', login_1.required, authentication.findall);
//Roles
routes.get('/api/roles/findall', roles.findAll);
routes.post('/api/roles/create', login_1.required, roles.create);
routes.delete('/api/roles/delete', login_1.required, roles.delete);
exports.default = routes;
