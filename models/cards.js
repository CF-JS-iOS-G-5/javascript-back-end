'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cardSchema = Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  picData: {type: String, required: true},

});

module.exports = mongoose.model('card', cardSchema);
