'use strict';

const debug = require('debug')('bizapp:mu-controller');
const createError = require('http-errors');
const router = require('../routes/muapi-routes');

module.exports = exports = {};

exports.getMuRoute = function(req, res) {
  debug('#getMuRoute');

  if(!req.body.language || !req.body.zipcode) return createError(400, 'Resource required.');


  let route =  (`https://api.meetup.com/find/events?text="${req.body.language}"&key=${process.env.APIkey}&zip="${req.body.zipcode}"&sign=true&photo-host=public`) 
  $.get(route, function(data) {
    let event = {}
    .append('name:' + data.id)

  }, 'json'
);
console.log(body);
};




.then(events => events)
.catch(err => createError(400, err.message));
