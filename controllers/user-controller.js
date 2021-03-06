'use strict';

const User = require('../models/user');
const debug = require('debug')('bizapp:user-controller');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req) {
  debug('#createUser');
  return User.findOne({iToken : req.body.iToken})
  .then(user => {
    if(!user){
      return new User(req.body).save()
      .then(user => user)
      .catch(err => createError(400, err.message));
    }
    return user;
  })
  .catch(err => createError(404, err.message));
};

exports.fetchUser = function(req){
  return User.findOne({iToken : req.params.iToken})
  .then(user => {
    return user;
  })
  .catch(err => createError(404, err.message));

};

exports.deleteUser = function (req){
  return User.findOne({iToken : req.params.iToken})
  .then(user =>{
    return User.findByIdAndRemove(user.id);
  });
};
