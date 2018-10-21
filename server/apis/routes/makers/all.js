const data = require('../../data/makes.json');


export default (req, res) => {
  const makers = data;

  res.status(200).json({ makers });
};
