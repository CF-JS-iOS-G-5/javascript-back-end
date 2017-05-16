'use strict';

const debug = require('debug')('bizapp:card-routes');
const cardController = require('../controllers/cardController');
const createError = require('http-errors');

module.exports = function(router){

  router.post('/api/user/:userId/card', (req,res) =>{
    debug('#post api/user:userId/card');
    console.log(`This is the req.body inside of card-routes POST route ${req.body}`);

    cardController.createCard(req.body, req.params.userId)
    .then(card => {
      res.json(card);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.put('api/user/:userId/card/:cardId', (req, res) =>{
    debug('#PUT api/user/:userId/card/:cardId');
    console.log(`This is the req.body inside of card-routes PUT route ${req.body}`);
    console.log(`This is the req.params inside of card-routes PUT route ${req.params}`);

    if(!req.params.userId) return res.status(400).send(createError(400, 'User Id is required'));
    if(!req.params.cardId) return res.status(400).send(createError(400, 'Card Id is required'));

    cardController.updateCard(req.body, req.params.userId, req.Params.cardId)
    .then(card =>{
      res.json(card);
    })
    .catch(err => res.status(404).send(err.message));
  });

  router.delete('/api/user/:userId/card', (req,res) =>{
    debug('#DELETE /api/user/:userId/card');
    console.log(`This is the req.params inside of card-routes DELETE all route ${req.params}`);

    if(!req.params.userId) return res.status(400).send(createError(400, 'User Id is required'));


    cardController.deleteAllCards(req.params.userId)
    .then( ()=>{
      res.status(204).send();
    })
    .catch( err => res.status(404).send(err.message));
  });

  router.delete('/api/user/:userId/card/:cardId', (req,res) =>{
    debug('#DELETE /api/user/:userId/card/cardId');
    console.log(`This is the req.params inside of card-routes DELETE route ${req.params}`);

    if(!req.params.userId) return res.status(400).send(createError(400, 'User Id is required'));
    if(!req.params.cardId) return res.status(400).send(createError(400, 'Card Id is required'));

    cardController.deleteCard(req.params.userId, req.params.cardId)
    .then( ()=>{
      res.status(204).send();
    })
    .catch( err => res.status(404).send(err.message));
  });


  router.get('/api/user/:userId/card/:cardId', (req,res)=>{
    debug('#GET /api/user/:userId/card/:cardId');
    console.log(`This is the req.params inside of card-routes GET route ${req.params}`);

    if(!req.params.userId) return res.status(400).send(createError(400, 'User Id is required'));
    if(!req.params.cardId) return res.status(400).send(createError(400, 'Card Id is required'));

    cardController.getCard(req.params.userId, req.params.cardId)
    .then( card =>{
      res.json(card);
    })
    .catch( err => res.status(400).send(err.message));
  });



  return router;
  // end of module exports
};
