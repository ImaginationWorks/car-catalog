const protocol = 'http';
const host = 'localhost';
const port = '3000';
const apiRoot = `${protocol}://${host}:${port}/api`;

const models = `${apiRoot}/models`;
const model = (id) => `${models}/${id}`;

const makers = `${apiRoot}/makers`;
const maker = (id) => `${makers}/${id}`;
const modelsOfMaker = (makerId) => `${makers}/${makerId}/models`;

const carOfWeek = `${models}/car-of-week`;

const searchCars = (makerId, modelId) => {
  return `${modelsOfMaker(makerId)}/${modelId ? modelId : ''}`;
};


export default {
  models,
  model,
  makers,
  maker,
  carOfWeek,
  modelsOfMaker,
  searchCars
}
