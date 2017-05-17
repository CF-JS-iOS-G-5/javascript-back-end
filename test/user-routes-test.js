'use strict';

const expect= require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../models/user');

mongoose.Promise = Promise;

require('../server');
const url = 'https://business-time-test.herokuapp.com/api/user';

const testUser = {
  iToken : '123bc',
};

describe('User routes', function(){
  describe('POST signup route', function(){
    describe('post with valid inputs', function(){
      after(done => {
        User.remove({})
        .then(()=> done())
        .catch(done);
      });
      it('should respond with new user', done =>{
        request.post(`${url}`)
       .send(testUser)
       .end((err, res) =>{
         console.log(res.status);
         expect(res.status).to.equal(200);
         done();
       });
      });
      it('should respond with 400 on bad route', done =>{
        request.post(`${url}/tacos`)
       .send(testUser)
       .end((err, res) =>{
         expect(res.status).to.equal(404);
         done();
       });
      });
      it('should respond with 200 on valid route', done =>{
        request.post(`${url}`)
       .send(testUser)
       .end((err, res) =>{
         expect(res.status).to.equal(200);
         done();
       });
      });
    });
  });

  describe('GET signin route', function(){
    it('should respond with existing user on valid request', done =>{
      server.get(`${url}/api/signin/`)
     .send('123456')
     .end((err, res) =>{
       expect(res.id).to.equal('123456');
       expect(res.name).to.equal('Patrick Sheridan');
       done();
     });
    });
    it('should respond with 400 on bad route', done =>{
      server.get(`${url}/api/hotdogs`)
     .end((err, res) =>{
       expect(res.status).to.equal(400);
       done();
     });
    });
    it('should respond with 200 on valid route', done =>{
      server.get(`${url}/api/signin/`)
     .send('123456')
     .end((err, res) =>{
       expect(res.status).to.equal(200);
       done();
     });
    });
  });
  describe('DELETE user route', function(){
    it('should respond with 400 on bad route', done =>{
      server.delete(`${url}/api/ninjaturtles`)
     .end((err, res) =>{
       expect(res.status).to.equal(400);
       done();
     });
    });
    it('should respond with 200 on valid route', done =>{
      server.delete(`${url}/api/user/`)
     .send('123456')
     .end((err, res) =>{
       expect(res.status).to.equal(204);
       done();
     });
    });
  });
  describe('PUT user route', function(){
    it('should respond with updated user', done =>{
      server.put(`${url}/api/user/123456`)
     .send( 'name', 'Bo Jangles')
     .end((err, res) =>{
       expect(res.id).to.equal('123456');
       expect(res.name).to.equal('Patrick Sheridan');
       done();
     });
    });
    it('should respond with 400 on bad route', done =>{
      server.put(`${url}/api/llamas`)
     .end((err, res) =>{
       expect(res.status).to.equal(400);
       done();
     });
    });
    it('should respond with 200 on valid route', done =>{
      server.put(`${url}/api/user/123456`)
     .send( 'name', 'Bo Jangles')
     .end((err, res) =>{
       expect(res.status).to.equal(200);
       done();
     });
    });
  });
});
