const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.get('/test', (req, resp) => {
  resp.json({
    'test': 'works!'
  })
})

// Create
router.post('/create', (req, resp) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  })

  product.save(err => {
    if (err) {
      resp.send('Could not create new product')
    }
    resp.send('Product created successfully')
  })
})

// Read
router.get('/:id', (req, resp) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      // return next(err);
      resp.send('Product Not Found')
    }
    resp.send(product)
  })
})

// Update
router.put('/:id/update', (req, resp) => {
  Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },
    (err, product) => {
      if (err) {
        resp.send('Could not update product')
      }
      resp.send('Product updated successfully')
    })
})

// Delete
router.delete('/:id/delete', (req, resp) => {
  Product.findByIdAndDelete(req.params.id, err => {
    if (err) {
      resp.send('Could not delete product')
    }
    resp.send('Product deleted successfully')
  })
})

module.exports = router;