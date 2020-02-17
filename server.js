if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

require('rootpath')();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const errorHandler = require('./_helpers/error-handler');
const blogAlertsRouter = require('./blog/blog-alerts');
const blogPostsRouter = require('./blog/blog-posts');
const reviewsRouter = require('./reviews/reviews.routes');
const mailerRouter = require('./mailer/mailer');
const path = require('path');
const logger = require('morgan');

const app = express();

app.use(helmet());
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
app.use('/api/blogAlerts', blogAlertsRouter);
app.use('/api/blogPosts', blogPostsRouter);
app.use('/mailer', mailerRouter);
app.use('/api/reviews', reviewsRouter);

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
