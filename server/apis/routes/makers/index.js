import express from 'express';
import all from './all';
import single from './single';
import models from '../models';


const makersRouter = express.Router();

makersRouter.get('/', all);
makersRouter.get('/:makerId', single);
makersRouter.use('/:makerId/models', models);


export default makersRouter;
