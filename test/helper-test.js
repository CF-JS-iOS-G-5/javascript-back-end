// 'use strict';
//
// // require('./mock-env');
// const expect = require('chai').expect;
// const superagent = require('superagent');
// const User = require('../models/user');
// const Card = require('../models/cards');
// // const Appointment = require('../model/appointment');
// // const testUser = require('./lib/user-mocks');
// // const mockProfile = require('./lib/profile-mocks');
// // const appointmentMocks = require('./lib/appointment-mocks');
// const server = require('../server');
//
// const baseURL = `http://localhost:${process.env.PORT}`;
//
// const testUser = {
//   iToken : 'testToken',
//   cardId : [],
// };
//
// const testCard = {
//   picData:'THISISPICDATA',
//   userId : 'anything',
// };
//
// describe('testing appointment router', function(){
//   let app;
//   before(done=>{
//     app = server.listen(3000)
//     done();
//   });
//   // after(serverControl.killServer);
//   afterEach((done) => {
//     Promise.all([
//       User.remove({}),
//       Card.remove({}),
//     ])
//     .then(() => done())
//     .catch(done);
//   });
//
//   describe.only('testing POST /api/user', () => {
//     // beforeEach(testUser.bind(this));
//     // beforeEach(testCard.bind(this));
//
//     it('should respond with an appointment', (done) => {
//       let example = { title:'example user', completion: false, userID: this.tempProfile.userID.toString() };
//       superagent.post(`${baseURL}/api/user`)
//       .send(example)
//       .set('Authorization', `Bearer ${this.tempToken}`)
//       .then(res => {
//         expect(res.status).to.equal(200);
//         expect(res.body.title).to.equal('example user');
//         expect(res.body.completion).to.equal(false);
//
//         done();
//       })
//       .catch(done);
//     });
//
//     it('test 401, when no appointment header is provided', (done) => {
//       superagent.post(`${baseURL}/api/user `)
//       .send({title: 'example user',  completion: false })
//       .set('Authorization', `Bearer ${this.aintmyToken}`)
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(401);
//         done();
//       })
//       .catch(done);
//     });
//     it('should return a 400 if missing field', (done) => {
//       superagent.post(`${baseURL}/api/user`)
//       .send('{')
//       .set('Content-type', 'application/json')
//       .set('Authorization', `Bearer ${this.tempToken}`)
//       .then(done)
//       .catch(err => {
//         expect(err.status).to.equal(400);
//         done();
//       })
//       .catch(done);
//     });
//   });
//   it('should respond with a 404 with bad url', (done) => {
//     let url = `${baseURL}/api/fakeappointment`;
//     superagent.get(url)
//     .set('Authorization', `Bearer ${this.tempToken}`)
//     .then(done)
//     .catch(res => {
//       expect(res.status).to.equal(404);
//       done();
//     })
//     .catch(done);
//   });
//
// //   describe('testing GET /api/user/:id', function(){
// //     beforeEach(testUser.bind(this));
// //     beforeEach(appointmentMocks.bind(this));
// //
// //     it('should respond with an appointment', (done) => {
// //       let url = `${baseURL}/api/user/${this.tempAppointment._id.toString()}`;
// //       superagent.get(url)
// //       .set('Authorization', `Bearer ${this.tempToken}`)
// //       .then(res => {
// //         expect(res.status).to.equal(200);
// //         expect(res.body.title).to.equal(this.tempAppointment.title);
// //         expect(res.body.completion).to.equal(false);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //
// //     it('test 401, when no appointment header is provided', (done) => {
// //       let url = `${baseURL}/api/user/${this.tempAppointment._id.toString()}`;
// //       superagent.get(url)
// //       .set('Authorization', `Bearer badtoken`)
// //       .then(done)
// //       .catch(res => {
// //         expect(res.status).to.equal(401);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //
// //     it('should respond with a 404', (done) => {
// //       let url = `${baseURL}/api/user/fakeID`;
// //       superagent.get(url)
// //       .set('Authorization', `Bearer ${this.tempToken}`)
// //       .then(done)
// //       .catch(res => {
// //         expect(res.status).to.equal(404);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //   });
// //   describe('testing DELETE /api/user/:id', function(){
// //     beforeEach(testUser.bind(this));
// //     beforeEach(appointmentMocks.bind(this));
// //
// //     it('should return 204', (done) => {
// //       let url = `${baseURL}/api/user/${this.tempAppointment._id.toString()}`;
// //       superagent.delete(url)
// //       .set('Authorization', `Bearer ${this.tempToken}`)
// //       .then(res => {
// //         expect(res.status).to.equal(204);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //
// //     it('DELETE test 401, when no authorization header is provided', (done) => {
// //       let url = `${baseURL}/api/user/${this.tempAppointment._id.toString()}`;
// //       superagent.delete(url)
// //       .set('Authorization', `Bearer badtoken`)
// //       .then(done)
// //       .catch(err => {
// //         expect(err.status).to.equal(401);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //
// //     it('should respond with a 404', (done) => {
// //       let url = `${baseURL}/api/user/fakeID`;
// //       superagent.delete(url)
// //       .set('Authorization', `Bearer ${this.tempToken}`)
// //       .then(done)
// //       .catch(res => {
// //         expect(res.status).to.equal(404);
// //         done();
// //       })
// //       .catch(done);
// //     });
// //   });
// });
