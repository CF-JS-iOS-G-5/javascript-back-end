'use strict';

const debug = require('debug')('bizapp:mu-routes');
const createError = require('http-errors');
const ctrlMu = require('../controllers/mu-controller');
const rp = require('request-promise');

module.exports = function(router) {

  router.get('/meetup/events/:language', (req,res) => {
    debug('#get ./api/meetup/events');
    console.log(req.body);
    let route = `https://api.meetup.com/find/events?sign=true&photo-host=public&text=${req.params.language}&key=${process.env.API_KEY}&radius=5&omit=created,updated,venue.id,venue.repinned,venue.country,venue.localized_country_name,venue.phone,group.created,group.lat,group.lon,group.who`;

    rp(route)
    .then(data => {
      console.log(data);
      return JSON.parse(data);
    })
    .then(body => {
      console.log(body);
      res.json(body);
    })
    .catch(err => res.status(err.status).send(err.message));
  //   rp(route, function(data) {
  //     console.log(data);
  //     return data;
  //   }
  //   .then(events => events)
  //   .catch(err => createError(400, err.message))
  // )
  // .then(events => events)
  // .catch(err => createError(400, err.message));
  // });
  // return router;
  });
  return router;
};
