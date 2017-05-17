'use strict';

const Card = require('../models/cards');
const debug = require('debug')('bizapp:card-controller');
const createError = require('http-errors');

module.exports = exports = {};

exports.createCard = function(req, res) {
  debug('#createCard');

  new Card(req.body).save()
  .then(card => {
    res.json(card);
  })
  .catch(err => res.status(400).send(err.message));
};
