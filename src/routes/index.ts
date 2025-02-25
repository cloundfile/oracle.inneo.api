import { Authentication } from '../application/Authentication';
import { Prefeitura } from '../application/Prefeitura';
import { required } from '../middlewares/login';
import { Router } from 'express';
const routes = Router();

const authentication = new Authentication();
const prefeitura = new Prefeitura();

routes.post('/api/login',     authentication.login);
routes.post('/api/usuario',   required, authentication.create);
routes.put('/api/usuario',    required, authentication.update);
routes.delete('/api/usuario', required, authentication.delete);
routes.get('/api/usuario',    required, authentication.findall);

routes.get('/prefeitura/castramovel', prefeitura.castramovel);

export default routes