import { Authentication } from '../application/Authentication';
import { required } from '../middlewares/login';
import { Youtube } from '../application/Puppeteer';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const youtube = new Youtube();

routes.post('/api/login',     authentication.login);
routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

routes.get('/api/youtube',    youtube.search);

export default routes