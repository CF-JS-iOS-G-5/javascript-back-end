'use strict';

const Card = require('../models/cards');
const User = require('../models/user');
// const debug = require('debug')('bizapp:card-controller');
const createError = require('http-errors');
// const del = require('del');
// const path = require('path');
const Promise = require('bluebird');

module.exports = exports = {};

exports.createCard = function(userId, card) {
  return User.findByIdAndAddCard(userId, card);
};

// exports.fetchCard = function(id){
//   console.log(id);
//   return Card.findById(id);
// };

exports.fetchAllCards = function(id){
  return Card.find({userId : id})
  .then(cards =>{
    console.log('here it is', cards);
    return cards;
  });
};


exports.deleteCard = function(id){
  if(!id)return Promise.reject(createError(400, 'id required'));
  return Card.findByIdAndRemove(id);
};
