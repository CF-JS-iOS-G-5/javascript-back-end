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

  describe('card routes', function(){
    describe('testing POST for a new card', function() {
      let mockUser;
      before(done => {
        chai.request(server)
        .post('/api/user')
        .send({'name': 'triscuit', 'id': '12345'})
        .end((err, res) => {
          if(err) console.error(err);
          mockUser = res.body;
          done();
        });
      });

      describe('Add a new business card to the mock album', function() {
        it('should create a business card', done => {
          chai.request(server)
          .post(`/api/user/${mockUser._id}/card`)
          .send({'userId': '12345'})
          .end((err) => {
            if(err) console.error(err);
            expect(mockUser).to.have.property('_id');
            done();
          });
        });
        it('should respond with 200 on a correct request', done => {
          chai.request(server)
          .post(`/api/user/${mockUser._id}/card`)
          .send({'id': '12345'})
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          });
        });
        it('should respond with a 400 on a bad request', done => {
          chai.request(server)
          .post('/api/user')
          .send({'id': '12345'})
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
      });
    });
    describe('GET card routes', function(){
      let mockUser;
      before(done => {
        chai.request(server)
        .post('/api/user')
        .send({'name': 'triscuit', 'id': '12345'})
        .end((err, res) => {
          if(err) console.error(err);
          mockUser = res.body;
          done();
        });
      });
      let mockCard;
      before(done =>{
        chai.request(server)
        .post(`/api/album/${mockUser._id}/card/${mockCard._id}`)

        .end((err, res)=> {
          if(err) console.error(err);
          mockCard = res.body;
          done();
        });
      });
      describe('Get card from user with correct inputs', function(){
        it('should return card', done =>{
          chai.request(server)
          .get(`/api/user/${mockUser._id}/card/${mockCard._id}`)
          .end((err)=>{
            if(err) console.error(err);
            expect(mockUser.mockCard.id).to.equal(mockCard._id);
            done();
          });
        });
        it('should return card', done =>{
          chai.request(server)
          .get(`/api/user/${mockUser._id}/card/${mockCard._id}`)
          .end((err, res)=>{
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          });
        });
        it('should return card', done =>{
          chai.request(server)
          .get(`/api/user/${mockUser._id}/`)
          .end((err, res)=>{
            if(err) console.error(err);
            expect(res.status).to.equal(400);
            done();
          });
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/user/${mockUser._id}/card/`)
        .end(() => {
          done();
        });
      });
      after(done => {
        chai.request(server)
        .delete(`/api/user/${mockUser._id}/card/${mockCard._id}`)
        .end(() => {
          done();
        });
      });
    });
    describe('DELETE card route', function(){
      let mockUser;
      before(done => {
        chai.request(server)
        .post('/api/user')
        .send({'name': 'triscuit', 'id': '12345'})
        .end((err, res) => {
          if(err) console.error(err);
          mockUser = res.body;
          done();
        });
      });
      let mockCard;
      before(done =>{
        chai.request(server)
        .post(`/api/user/${mockUser._id}/card/${mockCard._id}`)
        .end((err, res)=> {
          if(err) console.error(err);
          mockCard = res.body;
          done();
        });
      });
      it('should delete user given Id', done =>{
        chai.request(server)
        .delete(`/api/user/${mockUser._id}/card/${mockCard._id}`)
        .end((err, res)=>{
          expect(res.status).to.equal(204);
          done();
        });
      });
      it('should return 400 given bad route', done =>{
        chai.request(server)
        .delete(`/api/user/${mockUser._id}/card/`)
        .end((err, res)=>{
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    //add put route here
  });
});
