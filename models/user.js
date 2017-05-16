'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = Schema({
  firstName: {type: String, unique: true, required: true},
  lastName: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, unique: true, required: true},
  findHash: {type: String, unique: true},
});

module.exports = mongoose.model('User', user);
