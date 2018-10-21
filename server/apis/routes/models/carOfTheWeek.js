const makersData = require('../../data/makes.json');
const modelsData = require('../../data/models.json');
const carOfTheWeek = require('../../data/carOfTheWeek.json');


export default (req, res) => {
  const model = modelsData.find(model => model.id === carOfTheWeek.modelId);
  model.maker = makersData.find(maker => maker.id === model.makeId);
  model.review = carOfTheWeek.review;

  res.status(200).json({ carOfTheWeek: model });
};
