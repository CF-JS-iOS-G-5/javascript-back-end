'use strict';

const debug = require('debug')('bizapp:card-routes');
const cardController = require('../controllers/card-controller');
// const createError = require('http-errors');

module.exports = function(router){

  router.post('/user/:userId/card', (req, res) =>{
    debug('#post api/user:userId/card');
    cardController.createCard(req.params.userId, req.body)
    .then(card => res.json(card))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/user/:userId/card', (req, res)=>{
    cardController.fetchAllCards(req.params.userId)
    .then(cards =>{
      res.json(cards);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/user/:userId/card/:cardId', (req, res)=>{
    cardController.deleteCard(req.params.userId, req.params.cardId)
    .then(err => res.status(204).send(err.message))
    .catch(err => res.status(err.status).send(err.message));
  });


  return router;
  // end of module exports
};
