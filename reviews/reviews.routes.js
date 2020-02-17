const express = require('express');
const router = express.Router();
const db = require('../_helpers/db');
const Review = db.Review;

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => next(err));
}

function getById(req, res, next) {
  Review.findById(req.params.id)
    .then(post => post ? res.json(post) : res.sendStatus(404))
    .catch(err => next(err));
}

function create(req, res, next) {
  const review = new Review({
    title: req.body.title,
    body: req.body.body
  });
  // save post
  review.save()
    .then(() => res.json({}))
    .catch(err => next(err));
}

function update(req, res, next) {
  Review.findByIdAndUpdate(req.params.id, {
    $set: req.body
  })
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  Review.findByIdAndRemove(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}