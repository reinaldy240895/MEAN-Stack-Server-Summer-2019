const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

postSchema.set('toJSON', {
  virtuals: true
});

// Model name will determine collection name (e.g. Post -> posts)
module.exports = mongoose.model('Review', reviewSchema);