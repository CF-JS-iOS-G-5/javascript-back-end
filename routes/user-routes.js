'use strict';

const debug = require('debug')('bizapp:user-routes');
const userController = require('../controllers/user-controller');
// const createError = require('http-errors');

module.exports = function(router){
  router.post('/user', (req, res) => {
    debug('#post api/user');
    userController.createUser(req)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/user/:id', (req, res) =>{
    debug('#DELETE /api/user/:userId');
    console.log(`This is the req.params inside of user-routes DELETE route ${req.params}`);

    userController.deleteUser(req, res, req.params.id)
    .then(()=> res.status(204).send())
    .catch(err => res.status(err.status).send(err.message));

  });

  router.get('/user/:id', (req, res)=>{
    debug('#GET /api/user/:userId');
    userController.fetchUser(req.params.id, res)
    .then(user => res.json(user))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
  // end of module exports
};
