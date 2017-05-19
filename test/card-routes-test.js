'use strict';

const server =require('../server');
const chai = require('chai');
const expect= chai.expect;
const http = require('chai-http');
chai.use(http);
// const mongoose = require('mongoose');
// const Promise = require('bluebird');

// const User = require('../models/user');
// const Card = require('../models/cards');

// mongoose.Promise = Promise;
//
//
// const url = `http://localhost:${process.env.PORT}`;

const testUser = {
  iToken : 'testToken',
  cardId : [],
};

const testCard = {
  picData:'THISISPICDATA',
  userId : 'anything',
};



describe('Card routes', function(){
  let app;
  before(done=>{
    app = server.listen(3000)
    done();
  })
  describe('POST a new card', function(){
    let mockUser;
    before(done => {
      chai.request(server)
      .post('/api/user')
      .send(testUser)
      .end((err, res) => {
        if(err) console.error(err);
        mockUser = res.body;
        done();
      });
    });
  });
});
// describe('Card routes', function(){
//   describe('POST routes for cards', function(){
//     before(done =>{
//       new User(testUser)
//       .then(user => user.save())
//       .then(user =>{
//         this.tempUser = user;
//         console.log('temp user', this.tempUser);
//         return user;
//       })
//       .catch(() => done());
//     });
//     it('should a add a card to DB', done =>{
//       request.post(`{url}/api/user/591e63b9a840822f1f0578fe/card`)
//       .send(testUser)
//       .end((err, res)=> {
//         expect(res.body._id).to.be(null)
//         done();
//       })
//     })
//   });

//   let tempUser;
//   let tempCard;
//   beforeEach(done =>{
//     new User(testUser)
//     .then(user => user.save())
//     .then(user => {
//       tempUser = user;
//       return user;
//     })
//     .then(()=> new Card(testCard))
//     .then(card=>{
//       console.log('WORK', this.user);
//       card.userId = tempUser._id;
//       tempUser.cardId.push(card._id);
//       tempCard = card;
//       card.save();
//       done();
//     })
//   .catch(err => done(err));
//   });

  // describe('post with valid inputs', function(){
  // it('should respond with new user', done =>{
  //   request.post(`${url}/api/user`)
  //  .send(testUser)
  //  .end((err, res) =>{
  //    console.log(res.body);
  //    expect(res.body.iToken).to.equal('testToken');
  //    done()
  //
  //    describe('POST new card', function(){
  //
  //      describe('post card for a user', function (){
  //        it('should append a card to a user', done =>{
  //          console.log('it works', res.body._id);
  //          request.post(`${url}/api/user/591e5afff04f8d1ad02d9d23/card`)
  //          .send(testUser)
  //          .end((err, res) =>{
  //            console.log(res.body);
  //            expect(res.body._id).to.equal('testIdToken');
  //            done();
  //          });
  //        });
  //      });
  //    });

//       it('should respond with a 404 on a bad route', done => {
//         request.post(`${cardUrl}`)
//         .send(testCard.testId)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//       });
//       it('should respond with 200 on valid route', done =>{
//         request.post(`${cardUrl}`)
//        .send(testCard.testId)
//        .end((err, res) =>{
//          expect(res.status).to.equal(200);
//          done();
//        });
//       });
//     });
//     });
//   });
// });
//
// describe('GET card route', function(){
//   it('should respond with existing card on valid request', done =>{
//     request.get(`${cardUrl}/testIdToken`)
//    .end((err, res) =>{
//      expect(res.body.testId).to.equal('testIdToken');
//      done();
//    });
//   });
//   it('should respond with valid mongo id', done =>{
//     request.get(`${cardUrl}/testIdToken`)
//     .end((err, res) => {
//       expect(res.body._id).to.be.a('string');
//       done();
//     });
//   });
//   it('should respond with 400 on bad route', done =>{
//     request.get(`${cardUrl}/notRight/not`)
//    .end((err, res) =>{
//      expect(res.status).to.equal(404);
//      done();
//    });
//   });
//   it('should respond with 200 on valid route', done =>{
//     request.get(`${cardUrl}/testIdToken`)
//    .end((err, res) =>{
//      expect(res.status).to.equal(200);
//      done();
//    });
//   });
// });
//
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
