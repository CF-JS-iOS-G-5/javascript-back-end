'use strict';

const debug = require('debug')('bizapp:user-routes');
const userController = require('../controllers/user-controller');
const createError = require('http-errors');

module.exports = function(router){
  router.post('/user', (req, res) => {
    // console.log(`This is the req.body inside of user-routes POST route ${req}`);
    debug('#post api/user');

    userController.createUser(req, res, req.body);
  });

  // router.put('/user/:userId', (req, res) =>{
  //   debug('#PUT /api/user/:userId');
  //   console.log(`This is the req.body inside of user-routes put route ${req.body}`);
  //   console.log(`This is the req.params inside of user-routes PUT route ${req.params}`);
  //
  //   if(!req.params.id) return res.status(400).send(createError(400, 'User Id is required'));
  //   userController.updateUser(req.body, req.params.id)
  //   .then(user =>{
  //     res.json(user);
  //   })
  //   .catch(err => res.status(404).send(err.message));
  // });

  router.delete('/user/:userId', (req,res) =>{
    debug('#DELETE /api/user/:userId');
    console.log(`This is the req.params inside of user-routes DELETE route ${req.params}`);

    if(!req.params.id) return res.status(400).send(createError(400, 'User Id is required'));
    userController.deleteUser(req.params.id)
    .then(()=>{
      res.status(204).send();
    })
    .catch( err => res.status(404).send(err.message));
  });

  router.get('/user/:userId', (req,res)=>{
    debug('#GET /api/user/:userId');
    console.log(`This is the req.params inside of user-routes GET route ${req.params}`);

    if(!req.params.id) return res.status(400).send(createError(400, 'User Id is required'));
    userController.getUser(req.params.id)
    .then( user =>{
      res.json(user);
    })
    .catch( err => res.status(400).send(err.message));
  });

  return router;
  // end of module exports
};
