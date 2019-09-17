const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  lastname: {
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
  hash: {
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