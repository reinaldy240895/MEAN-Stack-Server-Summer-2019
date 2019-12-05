if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('./_helpers/error-handler');
const usersRouter = require('./users/users.controller');
const postsRouter = require('./posts/posts.controller');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

// use JWT auth to secure the api
// TODO: Implement jwt with jsonwebtoken
// app.use(jwt());

// api routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// configure app to serve static (Angular) files from public folder
app.use(express.static(path.join(__dirname, 'public'))); // learn this more

app.use(methodOverride());
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}!`);
});

// const express = require('express');
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const logger = require('morgan');
// const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/posts');

// const app = express();

// dotenv.config();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(logger('dev'));
// // configure app to serve static (Angular) files from public folder
// app.use(express.static(path.join(__dirname, 'public'))); // learn this more

// app.use('/api/users', usersRouter);
// app.use('/api/posts', postsRouter);

// // Create a database variable outside of the database connection callback to reuse the connection pool in your app.
// let db;

// // Connect to the database before starting the application server.
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true
// }, (err, client) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }

//   // Save database object from the callback for reuse.
//   db = mongoose.connection;
//   console.log('MongoDB connected successfully!');

//   // Initialize the app.
//   const server = app.listen(process.env.PORT || 3000, () => {
//     const port = server.address().port;
//     console.log(`Server is up and running on port ${port}!`);
//   });
// });