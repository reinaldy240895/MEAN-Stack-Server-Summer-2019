if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  console.log('MongoDB connected successfully!');
});

mongoose.Promise = global.Promise;

module.exports = {
  Review: require('../reviews/review.model')
};