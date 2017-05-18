'use strict';

// const Card = require('../models/cards');
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
