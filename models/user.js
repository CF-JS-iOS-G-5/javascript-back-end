'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = Schema({
  iToken: {type: String, unique: true},
});

module.exports = mongoose.model('user', user);
