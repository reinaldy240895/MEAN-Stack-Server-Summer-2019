const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1024
  }
}, {
  timestamps: true
});

userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);