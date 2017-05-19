'use strict';


const expect = require('chai').expect;


const mrUser = {
  iToken: 'blahblah',
};
describe('User model tests', function(){
  describe('it should have an iToken', function() {
    it('should have an iToken', function(){
      expect(mrUser.iToken).to.equal('blahblah');
    });
  });
});
