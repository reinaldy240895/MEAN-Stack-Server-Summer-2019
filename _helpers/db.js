const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  console.log('MongoDB connected successfully!');
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require('../users/user.model'),
  Post: require('../posts/post.model')
};