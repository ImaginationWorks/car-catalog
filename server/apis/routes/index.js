import express from 'express';
import makers from './makers';
import models from './models';


const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Car Catalog API Connected!' });
});

routes.use('/models', models);
routes.use('/makers', makers);


export default routes;
