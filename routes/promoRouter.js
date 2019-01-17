const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promos = require('../model/promotions');


promoRouter.use(bodyParser.json());


promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res, next) => {
  Promos.find({})
  .then((promos) => {
    res.json(promos);
  }, (err) => {next(err)})
  .catch((err) => {next(err)});

})
.post((req,res,next) => {
  Promos.create(req.body)
  .then((promo) => {
    console.log("Promotion created: " + promo);
    res.json(promo);
  }, (err) => {next(err)})
  .catch((err) => {next(err)});

})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Sorry, it\'s not going to be updated');
})
.delete((req, res, next) => {
  Promos.remove({})
  .then((response) => { res.json(response)}, (err) => {next(err)})
  .catch((err) =>{ next(err)});

});


promoRouter.route('/:promoId')

.get((req, res, next) => {
  Promos.findById(req.params.promoId)
  .then((promo) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promo);
  }, (err) => {next(err)})
  .catch((err) => {next(err)});

})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promos/' + req.params.promoId);
})
.put((req, res, next) => {
  Promos.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new: true})
  .then((promo) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(promo);
  }, (err) => {next(err)});
})
.delete((req, res) => {
  Promos.findByIdAndRemove(req.params.promoId)
  .then((response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  }, (err) => next(err))
  .catch((err) => {next(err)});
});

module.exports = promoRouter;
