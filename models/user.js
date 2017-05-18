'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Card = require('./cards');

const user = Schema({
  iToken: {type: String, unique: true},
  cardId: [{type: Schema.Types.ObjectId, ref: 'card' }],
});

const User = module.exports = mongoose.model('user', user);

User.findByIdAndAddCard = function(id, card) {
  return User.findById(id)
  .then(user => {
    card.userId = user._id;
    this.tempUser = user;
    return new Card(card).save();
  })
  .then(card => {
    this.tempUser.cardId.push(card._id);
    this.tempCard = card;
    return this.tempUser.save();
  })
  .then(() =>{
    return this.tempCard;
  });
};
