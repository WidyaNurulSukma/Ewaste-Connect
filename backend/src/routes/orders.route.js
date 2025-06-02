const {
  userExtractor,
  tokenExtractor
} = require('../middleware/auth.middleware');

const Order = require('../models/Order.model');

const orderRouter = require('express').Router();

orderRouter.post('', tokenExtractor, userExtractor, async (req, res) => {
  const user = req.user;
  const { imageUrl, description, tags, location } = req.body;
  const order = new Order({
    imageUrl,
    description,
    tags,
    location,
    creatorId: user.id
  });
  await order.save();
  return res.status(201).json({ message: 'new order created', order });
});

orderRouter.get('', tokenExtractor, userExtractor, async (req, res) => {
  const orders = await Order.find({});
  if (orders.length === 0) {
    return res.status(204).send();
  }
  return res.json({ status: 'success', orders });
});

orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    return res.json({ status: 'success', order });
  }
  return res.status(404).json({ error: 'order not found' });
});

orderRouter.put(
  '/:id/accept',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: id, collectorId: { $exists: false } },
        { $set: { collectorId: user.id, status: 'pending' } },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ error: 'Order not found or already accepted' });
      }

      return res.json({
        message: 'Order updated successfully',
        order: updatedOrder
      });
    } catch (error) {
      console.error('Error in accept order route:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

orderRouter.put(
  '/:id/complete',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const { id } = req.params;

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: id },
        { $set: { status: 'completed' } },
        { new: true, runValidators: true }
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ error: 'Order not found or already accepted' });
      }

      return res.json({
        message: 'Order updated successfully',
        order: updatedOrder
      });
    } catch (error) {
      console.error('Error in accept order route:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

orderRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;

      const deletedOrder = await Order.findOneAndDelete({
        _id: id,
        $or: [{ creatorId: user.id }, { collectorId: user.id }]
      });

      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found or unauthorized' });
      }

      return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error in delete order route:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = orderRouter;