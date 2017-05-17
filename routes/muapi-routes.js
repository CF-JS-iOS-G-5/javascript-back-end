'use strict';

const debug = require('debug')('bizapp:mu-routes');
const createError = require('http-errors');
const ctrlMu = require('../controllers/mu-controller');

module.exports = function(router) {

  router.get('./api/meetup/events', (req, res) => {
    debug('#get ./api/meetup/events');
    getMuRoute(req);
  });
};
