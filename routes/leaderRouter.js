const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../model/leaders');
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
})
.get((req, res, next) => {
  Leaders.find({})
  .then( (leaders) => {
      res.json(leaders);

  }, (err) => {next(err)})
  .catch((err)=> {next(err)});
})
.post((req,res,next) => {
  Leaders.create(req.body)
  .then((leader) => {
      console.log('Dish created:' + leader);
      res.json(leader);

  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
  Leaders.remove({})
  .then((response) => {
      res.json(response);
  }, (err) => next(err))
  .catch((err) => next(err));
});


leaderRouter.route('/:leaderId')

.get((req, res, next) => {
  Leaders.findById(req.params.dishId)
  .then((leaer) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
.put((req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.dishId, {
      $set: req.body
  }, { new: true })
  .then((leader) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(leader);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res) => {
  Leaders.findByIdAndRemove(req.params.dishId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));});

module.exports = leaderRouter;
