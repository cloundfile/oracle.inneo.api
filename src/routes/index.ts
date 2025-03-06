import { Authentication } from '../application/Authentication';
import { required } from '../middlewares/login';
import { Video } from '../application/Video';
import { Chunk } from '../application/Chunk';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const video = new Video();
const chunk = new Chunk();

//Login api
routes.post('/api/login',     authentication.login);
routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

//Video api
routes.post('/api/video/findby',  video.findBy);
routes.get('/api/video/findall',  video.findall);
routes.post('/api/video/create',  required, video.create);

routes.post('/api/transcription/findby',   chunk.findall);
routes.post('/api/transcription/create',   required, chunk.create);
routes.delete('/api/transcription/delete', required, chunk.delete);

export default routes