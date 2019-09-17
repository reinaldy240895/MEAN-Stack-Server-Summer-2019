const config = require('config.json');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
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