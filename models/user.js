'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = Schema({
  name: {type: String, required: true},
  city: {type: String, max: 50},
  id: {type: Number, required: true},
  email: {type: String, max: 100},
  zip: {type: Number, required: true},

});

module.exports = mongoose.model('User', user);
