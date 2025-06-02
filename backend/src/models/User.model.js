const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  passwordHash: {
    type: String,
    required: true,
    unique: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: false
  },
  location: [{ body: String, date: Date }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString();
    delete returnedDoc._id;
    delete returnedDoc.__v;
    delete returnedDoc.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
