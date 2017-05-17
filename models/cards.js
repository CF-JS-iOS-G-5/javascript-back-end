'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');
const Gallery = require('./gallery');

const cardSchema = Schema({
  name: {type: String, required: true},
  phoneNumber: {type: String, max: 11},
  email: {type: String, required: true},
  jobTitle: {type: String, required: false},
  company: {type: String, max: 50},
  websites: {type: String, max: 200},
  skills: {type: Array, required: true},
  imageURI: {type: String, required: true, unique: true},
  userId: {type: Schema.Types.ObjectId, required: true},
});

const Card = module.exports = mongoose.model('card', cardSchema);

Card.findByIdAndAddGallery = function(id, gallery) {
  return Card.findbyId(id)
  .then(gal => {
    console.log(gal);
    gallery.cardId = gal._id;
    this.galCards = gal;
    return new Gallery(gal).save();
  })
  .then(gal => {
    this.galCards.aGallery.push(gal._id);
    this.tempUser = gal;
    return this.galCards.save();
  })
  .then(() => {
    this.tempGal;
  })
  .catch(err => Promise.reject(err));
};
