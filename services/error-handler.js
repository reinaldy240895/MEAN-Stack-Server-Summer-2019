module.exports = handleError = (response, error, status) => {
  if (status) {
    console.error(`Error(${status}): ${error instanceof Object ? JSON.stringify(error) : error}`)
    return response.status(status).json(error)
  } else {
    console.error(`Error: ${error instanceof Object ? JSON.stringify(error) : error}`)
    return response.json(error)
  }
}