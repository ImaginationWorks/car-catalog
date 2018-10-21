const makersData = require('../../data/makes.json');
const modelsData = require('../../data/models.json');


export default (req, res) => {
  const modelId = req.params.modelId * 1;
  const model = modelsData.find(model => model.id === modelId);
  model.maker = makersData.find(maker => maker.id === model.makeId);

  res.status(200).json({ model });
};
