import { combineReducers } from 'redux';
import CarReducer from './Car.reducer';


export default combineReducers({
  car: CarReducer
});
