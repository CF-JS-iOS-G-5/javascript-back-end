'use strict';

const User = require('../models/user');
const debug = require('debug')('bizapp:user-controller');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req) {
  debug('#createUser');

  let tempToken = null;
  tempToken= req.body.iToken;
  req.body.iToken = null;
  delete req.body.iToken;

  let newUser = new User(req.body);
  return newUser.generateiTokenHash(tempToken)
  .then(user => user.save())
  .catch(err => createError(401, err.message));
};
