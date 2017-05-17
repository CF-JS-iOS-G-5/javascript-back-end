'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  imageURI: {type: Array, required: true, unique: true},
  date: {type: String},
});

const Gallery = module.exports = mongoose.model('gallery', gallerySchema);
