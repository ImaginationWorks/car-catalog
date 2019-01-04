import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import {
  CARS,
  MAKERS,
  MODELS_OF_MAKER,
  CAR_OF_WEEK,
  CAR_SELECTED
} from '../actions/ActionTypes';


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


export default reducer;
