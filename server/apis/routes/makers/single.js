const data = require('../../data/makes.json');


export default (req, res) => {
  const makerId = req.params.makerId * 1;
  const maker = data.find(c => c.id === makerId);

  res.status(200).json({ maker });
};
