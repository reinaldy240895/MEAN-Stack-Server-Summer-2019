module.exports = handleError = (response, error, status) => {
  if (status) {
    console.error(`Error(${status}): ${error}`)
    return response.status(status).json(error)
  } else {
    console.error(`Error: ${error}`)
    return response.json(error)
  }
}