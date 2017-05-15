'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
const expect = chai.expect;

chai.use(http);

describe('Card route tests', function() {
  let app;
  before(done => {
    app = server.listen(3000);
    done();
  });

  describe('testing POST for a new card', function() {
    let mockCard;
    before(done => {
      chai.request(server)
      .post('/api/user')
      .send({'name': 'triscuit', 'id': 'blue'})
      .end((err, res) => {
        if(err) console.error(err);
        mockCard = res.body;
        done();
      });
    });

    describe('Add a new business card to the mock album', function() {
      it('should create a business card', done => {
        chai.request(server)
        .post(`/api/user/${mockCard._id}/card`)
        .send({'id': 'shoes'})
        .end((err) => {
          if(err) console.error(err);
          expect(mockCard).to.have.property('_id');
          done();
        });
      });
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post(`/api/user/${mockCard._id}/card`)
        .send({'id': 'shoes'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should respond with a 400 on a bad request', done => {
        chai.request(server)
        .post('/api/user')
        .send({'id': 'shoes'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 404 if not found', done => {
        chai.request(server)
        .post('/')
        .send({'id': 'shoes'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
    })
  })
})
