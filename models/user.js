'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const createError = require('http-errors');

const user = Schema({
  hashediToken: {type: String, unique: true},
  hash: {type: String, unique: true},
});

user.methods.generateiTokenHash = function(iToken) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(iToken, 10, (err, hash) => {
      if(err) return reject(createError(401, 'iToken hashing failed'));
      this.iToken = hash;
      resolve(this);
    });
  });
};

user.methods.compareiTokenHash = function(iToken) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(iToken, this.iToken, (err, valid) => {
      if(err) return reject(createError(401, 'Password validation failed'));
      if(!valid) return reject(createError(401, 'Wrong iToken'));
      resolve(this);
    });
  });
};

module.exports = mongoose.model('user', user);
