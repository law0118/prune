const express = require('express');
const router = express.Router();

const Category = require('../models/category');

// router get
router.get('/categories', function(req, res, next){
  Category.geoNear(
    {
      type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    {
      maxDistance: 1000000, spherical: true
    }
  ).then(function(categories){
    res.send(categories);
  });
});

// router post
router.post('/categories', function(req, res, next){
  Category.create(req.body).then(function(category){
    res.send(category);
  }).catch(next);
});

router.put('/categories/:id', function(req, res, next){
  Category.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then(function(category){
    Category.findOne({_id: req.params.id})
    .then(function(category){
      res.send(category);
    });
  });
});

router.delete('/categories/:id', function(req, res, next){
  Category.findByIdAndRemove({_id: req.params.id})
  .then(function(category){
    res.send(category);
  });
});

module.exports = router;
