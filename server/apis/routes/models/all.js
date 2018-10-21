const makersData = require('../../data/makes.json');
const modelsData = require('../../data/models.json');


export default (req, res) => {
  const makerId = req.params.makerId * 1;
  const models = modelsData.filter(c => c.makeId === makerId);
  const addMaker = (model => {
    model.maker = makersData.find(maker => maker.id === model.makeId);
  });
  models.map(addMaker);

  res.status(200).json({ models });
};
