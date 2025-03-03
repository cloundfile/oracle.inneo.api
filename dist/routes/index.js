"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../application/Authentication");
const login_1 = require("../middlewares/login");
const Video_1 = require("../application/Video");
const express_1 = require("express");
const Chunk_1 = require("../application/Chunk");
const routes = (0, express_1.Router)();
const authentication = new Authentication_1.Authentication();
const video = new Video_1.Video();
const chunk = new Chunk_1.Chunk();
//Login api
routes.post('/api/login', authentication.login);
routes.post('/api/usuario', login_1.required, authentication.create);
routes.put('/api/usuario', login_1.required, authentication.update);
routes.delete('/api/usuario', login_1.required, authentication.delete);
routes.get('/api/usuario', login_1.required, authentication.findall);
//Video api
routes.post('/api/video', video.findBy);
routes.get('/api/videos', video.findall);
routes.post('/api/video/new', login_1.required, video.create);
routes.post('/api/transcription/', chunk.findall);
routes.post('/api/transcription/new', login_1.required, chunk.create);
routes.delete('/api/transcription', login_1.required, chunk.delete);
exports.default = routes;
