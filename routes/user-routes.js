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

  router.get('/user/:iToken', (req, res)=>{
    debug('#GET /api/user/:iToken');
    userController.fetchUser(req, req.params)
    .then(user => res.json(user))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/user/:iToken', (req, res) =>{
    debug('#DELETE /api/user/:userId');
    userController.deleteUser(req, req.params)
    .then(() => res.status(204).send())
      .catch(err => res.status(err.status).send(err.message));
  });


  return router;
  // end of module exports
};
