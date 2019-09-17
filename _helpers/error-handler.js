module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({
      message: err
    });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({
      message: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }

  if (!err.message) {
    // custom error from /validation/{register.js | login.js}
    return res.status(400).json({
      message: err
    });
  }

  // default to 500 server error
  return res.status(500).json({
    message: err.message
  });
}


// module.exports = handleError = (response, error, status) => {
//   if (status) {
//     console.error(`Error(${status}): ${error instanceof Object ? JSON.stringify(error) : error}`)
//     return response.status(status).json(error)
//   } else {
//     console.error(`Error: ${error instanceof Object ? JSON.stringify(error) : error}`)
//     return response.json(error)
//   }
// }