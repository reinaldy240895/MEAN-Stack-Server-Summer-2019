module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  // console.error(err.stack.split('\n')[0], '\n\t', err.stack.split('\n')[1]); // Show only first line of stack trace
  // if (res.headersSent) {
  //   return next(err);
  // }
  // res.status(500).send(JSON.stringify(err));

  if (typeof (err) === 'string') {
    // custom application error
    res.status(400).json({
      message: err
    });
  } else if (err.name === 'ValidationError') {
    // mongoose validation error
    res.status(400).json({
      message: err.message
    });
  } else if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    res.status(401).json({
      message: 'Invalid Token'
    });
  } else if (!err.message) {
    // custom error from /validation/{register.js | login.js}
    res.status(400).json({
      message: err
    });
  } else {
    // default to 500 server error
    res.status(500).json({
      message: err.message
    });
  }
}
