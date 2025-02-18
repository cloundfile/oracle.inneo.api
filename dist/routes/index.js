"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../middlewares/login");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const Authentication_1 = require("../application/Authentication");
const authentication = new Authentication_1.Authentication();
routes.post('/api/login', authentication.login);
routes.post('/api/usuario', login_1.required, authentication.create);
routes.put('/api/usuario', login_1.required, authentication.update);
routes.delete('/api/usuario', login_1.required, authentication.delete);
routes.get('/api/usuario', login_1.required, authentication.findall);
exports.default = routes;
