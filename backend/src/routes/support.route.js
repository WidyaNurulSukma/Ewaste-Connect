const Support = require('../models/Support.model');

const supportRouter = require('express').Router();

supportRouter.post('', async (req, res) => {
  const { email, name, issue } = req.body;
  const support = new Support({ email, name, issue });
  console.log(support);
  await support.save();
  res.status(201).json({ message: 'issue created', issue: support });
});

module.exports = supportRouter;
