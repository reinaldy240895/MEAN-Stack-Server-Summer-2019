const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({
      message: 'Username or password is incorrect'
    }))
    .catch(err => next(err));
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}


// const express = require('express')
// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const handleError = require('../services/error-handler')
// // Load input validation
// const validateRegisterInput = require("../validation/register")
// const validateLoginInput = require("../validation/login")

// const router = express.Router()

// // @route POST api/users/register
// // @desc Register user
// // @access Public
// router.post('/register', (req, resp) => {
//   const {
//     errors,
//     isValid
//   } = validateRegisterInput(req.body)

//   // Check validation
//   if (!isValid) {
//     return handleError(resp, errors, 400)
//   }

//   User.findOne({
//     email: req.body.email
//   }).then(user => {
//     if (user) {
//       return handleError(resp, 'Email already exists', 400)
//     } else {
//       const user = new User({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: req.body.password
//       })

//       // Hash password before saving in database
//       bcrypt.genSalt(10, (err, salt) => {
//         if (err)
//           return handleError(resp, err)
//         bcrypt.hash(user.password, salt, (err, hash) => {
//           if (err)
//             return handleError(resp, err)
//           user.password = hash
//           user.save((err, user) => {
//             if (err)
//               return handleError(resp, err, 400)
//             // return handleError(resp, 'Could not create new user', 400)
//             resp.status(200).json(user)
//           })
//         })
//       })
//     }
//   }).catch(err => {
//     return handleError(resp, err)
//   })
// })

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post('/login', (req, resp) => {
//   const {
//     errors,
//     isValid
//   } = validateLoginInput(req.body);
//   // Check validation
//   if (!isValid) {
//     return handleError(resp, errors, 400)
//   }

//   // Form validation
//   // const {
//   //   errors,
//   //   isValid
//   // } = validateLoginInput(req.body);
//   // Check validation
//   // if (!isValid) {
//   //   return resp.status(400).json(errors);
//   // }
//   const email = req.body.email
//   const password = req.body.password
//   // Find user by email
//   User.findOne({
//     email
//   }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return resp.status(404).json({
//         emailnotfound: 'Email not found'
//       })
//     }
//     // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         }
//         // Sign token
//         jwt.sign(
//           payload,
//           process.env.secretOrKey, {
//             expiresIn: 31556926 // 1 year in seconds
//           },
//           (err, token) => {
//             if (err)
//               return handleError(resp, err)
//             resp.status(200).json({
//               success: true,
//               token: 'Bearer ' + token
//             })
//           }
//         )
//       } else {
//         return handleError(resp, 'Password incorrect', 400)
//         // return resp.status(400).json({
//         //   passwordincorrect: 'Password incorrect'
//         // })
//       }
//     })
//   })
// })

// module.exports = router