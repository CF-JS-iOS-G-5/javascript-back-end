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
  iToken : 'testToken',
};

describe('User routes', function(){
  describe('POST signup route', function(){
    describe('post with valid inputs', function(){
      it('should respond with new user', done =>{
        request.post(`${url}`)
       .send(testUser)
       .end((err, res) =>{
         expect(res.body.iToken).to.equal('testToken');
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
      request.get(`${url}/testToken`)
     .end((err, res) =>{
       expect(res.body.iToken).to.equal('testToken');
       done();
     });
    });
    it('should respond with 400 on bad route', done =>{
      request.get(`${url}/notRight/not`)
     .end((err, res) =>{
       expect(res.status).to.equal(404);
       done();
     });
    });
    it('should respond with 200 on valid route', done =>{
      request.get(`${url}/testToken`)
     .end((err, res) =>{
       expect(res.status).to.equal(200);
       done();
     });
    });
  });
  describe('DELETE user route', function(){
    it('should respond with 204 on bad route', done =>{
      request.delete(`${url}/testToken`)
     .end((err, res) =>{
       expect(res.status).to.equal(204);
       done();
     });
    });
    it('should respond with 404 on valid route', done =>{
      request.delete(`${url}/badRoute/what`)
     .end((err, res) =>{
       expect(res.status).to.equal(404);
       done();
     });
    });
  });
});
