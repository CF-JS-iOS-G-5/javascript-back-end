'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const createError = require('http-errors');

const Schema = mongoose.Schema;

const user = Schema({
  iToken: {type: String, unique: true},
});

// user.methods.generateiTokenHash = function(iToken) {
//   let hash = JSON.stringify(iToken.iToken);
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(hash, 10, (err, hash) => {
//       console.log('This is the toekn hash ', hash);
//       if(err) return reject(createError(401, 'hash hashing failed'));
//       this.hash = hash;
//       resolve(this);
//     });
//   });
// };
//
// user.methods.compareiTokenHash = function(iToken) {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(iToken, this.iToken, (err, valid) => {
//       if(err) return reject(createError(401, 'Password validation failed'));
//       if(!valid) return reject(createError(401, 'Wrong iToken'));
//       resolve(this);
//     });
//   });
// };

module.exports = mongoose.model('user', user);
