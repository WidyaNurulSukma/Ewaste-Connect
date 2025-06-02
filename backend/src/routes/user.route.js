const {
  userExtractor,
  tokenExtractor
} = require('../middleware/auth.middleware');

const Order = require('../models/Order.model');

const userRouter = require('express').Router();

userRouter.get('/profile', tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user.toJSON();
  const orders = await Order.find({ creatorId: user.id });
  user.orders = orders;
  return res.json({ status: 'success', user });
});

userRouter.put('/profile', tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user;
  const { profileImage } = req.body;
  user.profileImage = profileImage;
  await user.save();
  return res.json({ status: 'sucess', message: 'user profile updated' });
});

userRouter.put('/role', tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user;
  let role = 'user';
  if (user.role === 'user') {
    role = 'Collector';
  }
  user.role = role;
  user.updatedAt = new Date();
  const newUser = await user.save();
  return res.json({ status: 'success', user: newUser });
});

module.exports = userRouter;
