'use strict';

const debug = require('debug')('bizapp:mu-controller');
const createError = require('http-errors');
const router = require('../routes/muapi-routes');

module.exports = exports = {};

exports.getMuRoute = function(req, res) {
  debug('#getMuRoute');

  // if(!req.body.language || !req.body.zipcode) return createError(400, 'Resource required.');


  let route = `https://api.meetup.com/find/events?sign=true&photo-host=public&text=javascript&key=797c4f5f5f4f5b1066186353e70276b&zip=02108&radius=smart&omit=created,updated,venue.id,venue.repinned,venue.country,venue.localized_country_name,venue.phone,group.created,group.lat,group.lon,group.who`;
    // (`https://api.meetup.com/find/events?text="${req.body.language}"&key=${process.env.APIkey}&zip="${req.body.zipcode}"&sign=true&photo-host=public`)
  $.get(route, function(data) {
    return data;
  }
)
.then(events => events)
.catch(err => createError(400, err.message));
};
