import { required } from '../middlewares/login';
import { Router } from 'express';
const routes = Router();

import { Authentication } from '../application/Authentication';
import { Video  } from '../services/api-youtube';

const authentication = new Authentication();
const youtube = new Video();

routes.get('/api/videos',      youtube.search)
routes.post('/api/login',     authentication.login);
routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

export default routes