import { createAction, handleActions } from 'redux-actions';
import update from 'immutability-helper';


const CARS = 'data/CARS';
const loadCarsAction = createAction(CARS);

const MAKERS = 'data/MAKERS';
const loadMakersAction = createAction(MAKERS);

const MODELS_OF_MAKER = 'data/MODELS_OF_MAKER';
const loadModelsOfMakerAction = createAction(MODELS_OF_MAKER);

const CAR_SELECTED = 'data/CAR_SELECTED';
const selectCarAction = createAction(CAR_SELECTED);

const CAR_OF_WEEK = 'data/CAR_OF_WEEK';
const loadCarOfWeekAction = createAction(CAR_OF_WEEK);

const reducer = handleActions({
  [CARS]: (state, action) => update(state, {
    list: {
      $set: action.payload
    }
  }),
  [MAKERS]: (state, action) => update(state, {
    makers: {
      $set: action.payload
    }
  }),
  [MODELS_OF_MAKER]: (state, action) => update(state, {
    modelsOfMaker: {
      $set: action.payload
    }
  }),
  [CAR_SELECTED]: (state, action) => update(state, {
    selected: {
      $set: action.payload
    }
  }),
  [CAR_OF_WEEK]: (state, action) => update(state, {
    carOfWeek: {
      $set: action.payload
    }
  }),
}, {
  list: [],
  makers: [],
  modelsOfMaker: [],
  selected: null,
  carOfWeek: null
});


export {
  loadCarsAction,
  loadMakersAction,
  loadModelsOfMakerAction,
  selectCarAction,
  loadCarOfWeekAction
}

export default reducer;
