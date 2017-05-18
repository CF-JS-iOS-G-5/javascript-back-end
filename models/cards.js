'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cardSchema = Schema({
  // name: {type: String, required: true},
  // phoneNumber: {type: String, max: 11},
  // email: {type: String, required: true},
  // jobTitle: {type: String, required: false},
  // company: {type: String, max: 50},
  // websites: {type: String, max: 200},
  // skills: {type: Array, required: true},
  // imageURI: {type: String, required: true, unique: true},
  userId: [{type: Schema.Types.ObjectId, required: true}],
  picData: {type: String, required: true},

});

module.exports = mongoose.model('card', cardSchema);
