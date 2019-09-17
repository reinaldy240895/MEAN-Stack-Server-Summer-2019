const express = require('express');
const router = express.Router();
const postService = require('./post.service');

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
  postService.authenticate(req.body)
    .then(post => post ? res.json(post) : res.status(400).json({
      message: 'Username or password is incorrect'
    }))
    .catch(err => next(err));
}

function register(req, res, next) {
  postService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  postService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  postService.getById(req.post.sub)
    .then(post => post ? res.json(post) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  postService.getById(req.params.id)
    .then(post => post ? res.json(post) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  postService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  postService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}