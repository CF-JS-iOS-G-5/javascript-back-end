'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const cardSchema = Schema({
  name: {type: String, required: true},
  phoneNumber: {type: String, max: 11},
  email: {type: String, required: true},
  jobTitle: {type: String, required: false},
  company: {type: String, max: 50},
  websites: {type: String, max: 200},
  skills: {type: Array, required: true},
  _id : {type: String, required: true},
  cardJpg: {type: String},
  userId: [{schema.objectId, ref: 'aUser'}]
})

const Card = module.exports = mongoose.model('card', cardSchema);

Card.findByIdAndAddUser = function(id, user) {
  return Card.findbyId(id)
  .then(person => {
    console.log(person);
    user.cardId = person._id;
    this.userCards = person;
    return new User(user).save();
  })
  .then(user => {
    this.userCards.aUser.push(user._id);
    this.tempUser = user;
    return this.userCards.save();
  })
  .then(() => {
    this.tempUser;
  })
  .catch(err => Promise.reject(err));
};
