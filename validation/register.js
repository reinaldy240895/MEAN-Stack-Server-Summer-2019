// const express = require('express')
// const User = require('../model/User')
// const router = express.Router()

// // Create
// router.post('/register', (req, resp) => {
//   const user = new User({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password
//   })

//   user.save((err, user) => {
//     if (err) {
//       resp.send('Could not create new product')
//     }
//     resp.send('Product created successfully')
//   })
// })