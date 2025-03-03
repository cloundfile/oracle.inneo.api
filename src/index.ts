import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
var cors = require('cors');

AppDataSource.initialize().then(() => {
  const app: Application = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Header',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).send({});
    }
    next();
  });
  app.use(cors())  
  app.use(routes); 
  
  return app.listen(process.env.PORT || 3000);
}).catch(() => {
  console.log("Could not connect to the database");
});