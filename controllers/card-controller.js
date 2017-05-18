'use strict';

const Card = require('../models/cards');
const User = require('../models/user');


module.exports = exports = {};

exports.createCard = function(userId, card) {
  return User.findByIdAndAddCard(userId, card);
};


exports.fetchAllCards = function(id){
  return Card.find({userId : id})
  .then(cards => cards);
};


exports.deleteCard = function(userId, cardId){
  return Card.findByIdAndRemove(cardId);
};
