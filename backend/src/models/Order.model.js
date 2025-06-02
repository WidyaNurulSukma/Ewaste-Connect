const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collectorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: false
  },
  imageUrl: {
    type: String,
    required: true
  },
  location: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: false
  },
  status: {
    type: String,
    default: 'initiated'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    if (returnedObject.location && returnedObject.location._id) {
      delete returnedObject.location._id;
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
