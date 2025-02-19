"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../application/Authentication");
const login_1 = require("../middlewares/login");
const Puppeteer_1 = require("../application/Puppeteer");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const youtube = new Puppeteer_1.Youtube();
routes.post('/api/login', authentication.login);
routes.post('/api/usuario', login_1.required, authentication.create);
routes.put('/api/usuario', login_1.required, authentication.update);
routes.delete('/api/usuario', login_1.required, authentication.delete);
routes.get('/api/usuario', login_1.required, authentication.findall);
routes.get('/api/youtube', youtube.search);
exports.default = routes;
