const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 128
  },
  body: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2048
  },
  // author
  // email: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 50
  // },
}, {
  timestamps: true
})

// Model name will determine collection name (e.g. Post -> posts)
module.exports = mongoose.model('Post', postSchema)