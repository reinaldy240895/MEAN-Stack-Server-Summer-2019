const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const handleError = require('../services/error-handler')
// Load input validation
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

const router = express.Router()

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, resp) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body)

  // Check validation
  if (!isValid) {
    return handleError(resp, errors, 400)
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return handleError(resp, 'Email already exists', 400)
    } else {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      })

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        if (err)
          return handleError(resp, err)
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err)
            return handleError(resp, err)
          user.password = hash
          user.save((err, user) => {
            if (err)
              return handleError(resp, err, 400)
            // return handleError(resp, 'Could not create new user', 400)
            resp.status(200).json(user)
          })
        })
      })
    }
  }).catch(err => {
    return handleError(resp, err)
  })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, resp) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return handleError(resp, errors, 400)
  }

  // Form validation
  // const {
  //   errors,
  //   isValid
  // } = validateLoginInput(req.body);
  // Check validation
  // if (!isValid) {
  //   return resp.status(400).json(errors);
  // }
  const email = req.body.email
  const password = req.body.password
  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check if user exists
    if (!user) {
      return resp.status(404).json({
        emailnotfound: 'Email not found'
      })
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        }
        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey, {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err)
              return handleError(resp, err)
            resp.status(200).json({
              success: true,
              token: 'Bearer ' + token
            })
          }
        )
      } else {
        return handleError(resp, 'Password incorrect', 400)
        // return resp.status(400).json({
        //   passwordincorrect: 'Password incorrect'
        // })
      }
    })
  })
})

module.exports = router