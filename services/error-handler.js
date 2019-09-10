module.exports = errorHandler = (response, error, status) => {
  if (status) {
    return response.status(status).json({
      error: error
    })
  } else {
    return response.json({
      error: error
    })
  }
}