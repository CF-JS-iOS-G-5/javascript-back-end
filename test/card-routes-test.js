'use strict';

const chai = require('chai');
const http = require('chai-http');
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
// const User = require('../models/user');
const expect= require('chai').expect;

mongoose.Promise = Promise;


// const server = require('../server');
const userUrl = 'https://business-time-test.herokuapp.com/api/user';
const cardUrl = 'https://business-time-test.herokuapp.com/api/user/:userId/card';



const testUser = {
  iToken : 'testToken',
};

const testCard = {
  testId : 'testIdToken',
};

chai.use(http);

describe('Card routes', function(){
  describe('POST signup route', function(){
    describe('post with valid inputs', function(){
      it('should respond with new user', done =>{
        request.post(`${userUrl}`)
       .send(testUser)
       .end((err, res) =>{
         expect(res.body.iToken).to.equal('testToken');
         done();
       });
      });
      it('should append a card to a user', done =>{
        request.post(`${cardUrl}`)
       .send(testCard.testId)
       .end((err, res) =>{
         expect(res.body.testId).to.equal('testIdToken');
         done();
       });
      });
      it('should respond with a 404 on a bad route', done => {
        request.post(`${cardUrl}`)
        .send(testCard.testId)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with 200 on valid route', done =>{
        request.post(`${cardUrl}`)
       .send(testCard.testId)
       .end((err, res) =>{
         expect(res.status).to.equal(200);
         done();
       });
      });
    });
  });

  describe('GET card route', function(){
    it('should respond with existing card on valid request', done =>{
      request.get(`${cardUrl}/testIdToken`)
     .end((err, res) =>{
       expect(res.body.testId).to.equal('testIdToken');
       done();
     });
    });
    it('should respond with valid mongo id', done =>{
      request.get(`${cardUrl}/testIdToken`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        done();
      });
    });
    it('should respond with 400 on bad route', done =>{
      request.get(`${cardUrl}/notRight/not`)
     .end((err, res) =>{
       expect(res.status).to.equal(404);
       done();
     });
    });
    it('should respond with 200 on valid route', done =>{
      request.get(`${cardUrl}/testIdToken`)
     .end((err, res) =>{
       expect(res.status).to.equal(200);
       done();
     });
    });
  });

  // describe('DELETE card route', function(){
  //   it('should respond with 204 on valid route', done =>{
  //     request.delete(`${url}/testToken`)
  //    .end((err, res) =>{
  //      expect(res.status).to.equal(204);
  //      done();
  //    });
  //   });
  //   it('should respond with 404 on bad route', done =>{
  //     request.delete(`${url}/badRoute/what`)
  //    .end((err, res) =>{
  //      expect(res.status).to.equal(404);
  //      done();
  //    });
  //   });
  // });
});
