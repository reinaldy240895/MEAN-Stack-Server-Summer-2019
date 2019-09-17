const express = require('express')
const Post = require('../models/Post')
const handleError = require('../services/error-handler')

const router = express.Router()

router.get('/', (req, resp) => {
  Post.find((err, posts) => {
    if (err)
      return handleError(resp, err)
    resp.status(200).json(posts)
  })
})

// Create
router.post('/', (req, resp) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  })

  post.save((err, post) => {
    if (err)
      return handleError(resp, err)
    resp.status(200).json(post)
  })
})

// Read
router.get('/:id', (req, resp) => {
  Post.findById(req.params.id, (err, post) => {
    if (err)
      // return next(err);
      return handleError(resp, err, 400)
    resp.status(200).json(post)
  })
})

// Update
router.put('/:id', (req, resp) => {
  Post.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {
    // return updated post
    new: true
  }, (err, post) => {
    if (err)
      return handleError(resp, err, 400)
    resp.status(200).json(post)
  })
})

// Delete
router.delete('/:id', (req, resp) => {
  Post.findByIdAndDelete(req.params.id, err => {
    if (err)
      return handleError(resp, err)
    resp.status(204).json({})
  })
})

module.exports = router