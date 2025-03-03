import { Authentication } from '../application/Authentication';
import { required } from '../middlewares/login';
import { Video } from '../application/Video';
import { Router } from 'express';
import { Chunk } from '../application/Chunk';
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
routes.get('/api/youtube',    video.findall);
routes.post('/api/youtube',   required, video.create);

routes.get('/api/transcription/',   chunk.findall);
routes.post('/api/transcription',   required, chunk.create);
routes.delete('/api/transcription', required, chunk.delete);

export default routes