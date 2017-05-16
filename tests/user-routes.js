'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
const expect = chai.expect;

const url = `http://localhost:${process.env.PORT}`;

const testUser = {
  id: '123456',
  name: 'Pat Sheridan',
};

chai.use(http);

describe('User routes', function(){
  describe('POST signup route', function(){
    it('should respond with new user', done =>{
      server.post(`${url}/api/signup`)
      .send(testUser)
      .end((err, res) =>{
        expect(res.id).to.equal('123456');
        expect(res.name).to.equal('Patrick Sheridan');
        done();
      });
    });
    it('should respond with 400 on bad route', done =>{
      server.post(`${url}/api/tacos`)
      .send(testUser)
      .end((err, res) =>{
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should respond with 200 on valid route', done =>{
      server.post(`${url}/api/signup`)
      .send(testUser)
      .end((err, res) =>{
        expect(res.status).to.equal(200);
        done();
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
