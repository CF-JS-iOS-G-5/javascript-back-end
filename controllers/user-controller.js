'use strict';

const User = require('../models/user');
const debug = require('debug')('bizapp:user-controller');
// const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req, res) {
  debug('#createUser');
  new User(req.body).save()
  .then(user => {
    res.json(user);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteUser = function (req, res, id){
  User.findByIdAndRemove(id)
  .then(()=> res.status(204).send())
  .catch(err => res.status(err.status).send(err.message));
};

exports.fetchUser = function(id, res){
  User.findById(id)
  .then(user => res.json(user))
  .catch(err => res.status(err.status).send(err.message));
};
