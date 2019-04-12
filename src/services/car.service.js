import _ from 'lodash';
import {
  loadCarsAction,
  loadMakersAction,
  loadModelsOfMakerAction,
  selectCarAction,
  loadCarOfWeekAction
} from '../actions/Actions';
import request from './request';
import apiPath from './apiPaths';


const fetchMakers = () => {
  return async function (dispatch) {
    try {
      const payload = await request(apiPath.makers, {});
      if (_.isEmpty(payload.makers)) {
        return null; // TODO: implement alerting and dispatch errorAlert
      }
      return dispatch(loadMakersAction(payload.makers));
    } catch {
      // return dispatch(errorAlert('Failed to load makers'));
      return null; // TODO: implement alerting and dispatch errorAlert
    }
  };
};

const fetchModelsOfMaker = (makerId) => {
  return async function (dispatch) {
    try {
      if (!makerId) {
        return dispatch(loadModelsOfMakerAction([]))
      }
      const payload = await request(apiPath.modelsOfMaker(makerId), {});
      if (_.isEmpty(payload.models)) {
        // return dispatch(errorAlert('No models of the given maker was found.'));
        return null; // TODO: implement alerting and dispatch errorAlert
      }
      return dispatch(loadModelsOfMakerAction(payload.models));
    } catch {
      // return dispatch(errorAlert('Failed to load models of the given maker.'));
      return null; // TODO: implement alerting and dispatch errorAlert
    }
  };
};

const fetchCars = ({ makerId, modelId }) => {
  return async function (dispatch) {
    try {
      const payload = await request(apiPath.fetchCars(makerId, modelId), {});
      if (_.isEmpty(payload.models) && _.isEmpty(payload.model)) {
        // return dispatch(errorAlert('No car was matched the search criteria.'));
        return null; // TODO: implement alerting and dispatch errorAlert
      }
      return dispatch(loadCarsAction(payload.models || [payload.model]));
    } catch {
      // return dispatch(errorAlert('Failed to search cars'));
      return null; // TODO: implement alerting and dispatch errorAlert
    }
  };
};

const fetchCar = (id) => {
  return async function (dispatch) {
    try {
      const payload = await request(apiPath.model(id), {});
      if (_.isEmpty(payload.model)) {
        // return dispatch(errorAlert('No car was found.'));
        return null; // TODO: implement alerting and dispatch errorAlert
      }
      return dispatch(selectCarAction(payload.model));
    } catch {
      // return dispatch(errorAlert('Failed to load car'));
      return null; // TODO: implement alerting and dispatch errorAlert
    }
  };
};

const fetchCarOfWeek = () => {
  return async function (dispatch) {
    try {
      const payload = await request(apiPath.carOfWeek, {});
      if (_.isEmpty(payload.carOfTheWeek)) {
        // return dispatch(errorAlert('No car of the Week was found.'));
        return null; // TODO: implement alerting and dispatch errorAlert
      }
      return dispatch(loadCarOfWeekAction(payload.carOfTheWeek));
    } catch {
      // return dispatch(errorAlert('Failed to load car of the week.'));
      return null; // TODO: implement alerting and dispatch errorAlert
    }
  };
};


export {
  fetchMakers,
  fetchModelsOfMaker,
  fetchCars,
  fetchCar,
  fetchCarOfWeek
}
