const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../users/user.service');
const dotenv = require('dotenv');
dotenv.config();

module.exports = jwt;

function jwt() {
  const secret = process.env.SECRET_KEY || config.SECRET_KEY;
  return expressJwt({
    secret,
    isRevoked
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/authenticate',
      '/api/users/register'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};