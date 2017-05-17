'use strict';

const User = require('../models/user');
const debug = require('debug')('bizapp:user-controller');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req,res) {
  debug('#createUser');
  new User(req.body).save()
  .then(user => {
    res.json(user);
  })
  .catch(err => res.status(400).send(err.message));
};
