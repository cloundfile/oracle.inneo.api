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
routes.post('/api/login',           authentication.login);

//Usuario
routes.post('/api/usuario/create',   authentication.create);
routes.put('/api/usuario/update',    required, authentication.update);
routes.delete('/api/usuario/delete', required, authentication.delete);
routes.get('/api/usuario/findall',   required, authentication.findall);

//Video api
routes.post('/api/video/findby',  video.findBy);
routes.get('/api/video/findall',  video.findall);
routes.post('/api/video/create',  required, video.create);

//Chunks
routes.post('/api/transcription/findby',   chunk.findby);
routes.post('/api/transcription/create',   required, chunk.create);
routes.delete('/api/transcription/delete', required, chunk.delete);

export default routes