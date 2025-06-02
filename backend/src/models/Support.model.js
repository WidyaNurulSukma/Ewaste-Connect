const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

supportSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
