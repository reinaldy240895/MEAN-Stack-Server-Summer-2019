const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  lastname: {
    type: String,
    required: true,
    min: 1,
    max: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)