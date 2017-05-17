'use strict';

const User = require('../models/user');
const debug = require('debug')('bizapp:user-controller');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req) {
  debug('#createUser');
  return User.findOne({iToken : req.body.iToken})
  .then(user => { //check user exists on bad token
    console.log('create user', user);
    if(!user){
      return new User(req.body).save()
      .then(user => user)
      .catch(err => createError(400, err.message));
    }
    return user;
  })
  .catch(err => createError(404, err.message));
};

exports.deleteUser = function (req, res, id){
  User.findByIdAndRemove(id)

};

exports.fetchUser = function(id, res){
  User.findById(id)
  .then(user => res.json(user))
  .catch(err => res.status(err.status).send(err.message));
};
