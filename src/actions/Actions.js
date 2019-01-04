import { createAction } from 'redux-actions';
import {
  CARS,
  MAKERS,
  MODELS_OF_MAKER,
  CAR_OF_WEEK,
  CAR_SELECTED
} from './ActionTypes';


const loadCarsAction = createAction(CARS);

const loadMakersAction = createAction(MAKERS);

const loadModelsOfMakerAction = createAction(MODELS_OF_MAKER);

const selectCarAction = createAction(CAR_SELECTED);

const loadCarOfWeekAction = createAction(CAR_OF_WEEK);


export {
  loadCarsAction,
  loadMakersAction,
  loadModelsOfMakerAction,
  selectCarAction,
  loadCarOfWeekAction
}
