const statusRouter = require('express').Router();

// check the health and status of the api
// we just return static OK for now

statusRouter.get('/', (req, res) => {
  return res.json({ status: 'OK' });
});

module.exports = statusRouter;
