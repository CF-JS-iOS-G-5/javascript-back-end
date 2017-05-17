'use strict';

const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const Promise = require('bluebird');
// const createError = require('http-errors');

const Schema = mongoose.Schema;

const user = Schema({
  iToken: {type: String, unique: true},
});

module.exports = mongoose.model('user', user);
