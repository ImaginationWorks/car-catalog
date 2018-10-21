const data = require('../../data/data.json');


export default (req, res) => {
  const modelId = req.params.modelId * 1;
  const model = data.filter(c => c.id === modelId);

  res.status(200).json({ model });
};
