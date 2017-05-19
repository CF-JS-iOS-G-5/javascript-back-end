'use strict';
const expect= require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');

mongoose.Promise = Promise;

// require('../request');
const url = `http://localhost:${process.env.PORT}`;


const testUser = {
  iToken : 'testToken',
};

const testCard = {
  picData:'THISISPICDATA',
  userId : 'anything',
};

let testVar;

describe('post with valid inputs', function(){
  it('should respond with new user', done =>{
    request.post(`${url}/api/user`)
   .send(testUser)
   .end((err, res) =>{
     expect(res.body.iToken).to.equal('testToken');
     done();

     describe('POST new card', function(){
       describe('post card for a user', function (){

         it('should append a card to a user', done =>{
           request.post(`${url}/api/user/${res.body._id}/card`)
           .send(testCard)
           .end((err, res) =>{
             expect(res.body._id).to.equal(`${res.body._id}`);
             done();
           });
         });
         it('should respond with a 404 on a bad route', done => {
           request.post(`${url}/`)
           .end((err, res) => {
             expect(res.status).to.equal(404);
             done();
           });
         });
         it('should respond with a 404 on a bad route', done => {
           request.post(`${url}/api/user/${res.body._id}/card`)
           .send('wrong')
           .end((err, res) => {
             expect(res.status).to.equal(400);
             done();
           });
         });
         it('should respond with 200 on valid route', done =>{
           request.post(`${url}/api/user/${res.body._id}/card`)
           .send(testCard)
           .end((err, res) =>{
             expect(res.status).to.equal(200);
             done();
           });
         });
       });
     });
     describe('GET card route', function(){
       it('should respond with existing card on valid request', done =>{
         request.get(`${url}/api/user/${res.body._id}/card`)
         .end((err, res) =>{
           expect(res.body[0].picData).to.equal('THISISPICDATA');
           done();
         });
       });
       it('should respond with valid mongo id', done =>{
         request.get(`${url}/api/user/${res.body._id}/card`)
          .end((err, res) => {
            expect(res.body[0].picData).not.be.String;
            done();
          });
       });
       it('should not respond undefined', done =>{
         request.get(`${url}/api/user/${res.body._id}/card`)
          .end((err, res) => {
            expect(res.body[0].picData).not.be.undefined;
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
       it('should respond with a 404 on a bad route', done => {
         request.post(`${url}/api/user/${res.body._id}/card`)
         .send('wrong')
         .end((err, res) => {
           expect(res.status).to.equal(400);
           done();
         });
       });
       it('should respond with 200 on valid route', done =>{
         request.get(`${url}/api/user/${res.body._id}/card`)
         .end((err, res) =>{
           testVar = res.body[0];
           expect(res.status).to.equal(200);
           done();
         });
       });
       describe('DELETE card route', function(){
         it('should respond with 204 on valid route', done =>{
           request.delete(`${url}/api/user/${res.body._id}/card/${testVar._id}`)
           .end((err, res) =>{
             expect(res.status).to.equal(204);
             done();
           });
         });
         it('should respond with 404 on bad route', done =>{
           request.delete(`${url}/badRoute/what`)
           .end((err, res) =>{
             expect(res.status).to.equal(404);
             done();
           });
         });
         it('should respond with a 400 on a bad route', done => {
           request.post(`${url}/api/user/${res.body._id}/card`)
           .send('wrong')
           .end((err, res) => {
             expect(res.status).to.equal(400);
             done();
           });
         });
       });
     });
   });
  });
});
