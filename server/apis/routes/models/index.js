import express from 'express';
import all from './all';
import carOfWeek from './carOfTheWeek';
import single from './single';


const modelsRouter = express.Router({ mergeParams: true });

modelsRouter.get('/', all);
modelsRouter.get('/car-of-week', carOfWeek);
modelsRouter.get('/:modelId', single);


export default modelsRouter;
