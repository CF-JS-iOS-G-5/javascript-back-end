'use strict';


const expect = require('chai').expect;

const mrCard = {
  userId: 'BLIMNTJRO',
  picData: 'XCFGETRNTU&^$%#',
};

describe('User model tests', function(){
  describe('it should have parameters', function() {
    it('should have a user Id', function(){
      expect(mrCard.userId).to.equal('BLIMNTJRO');
    });
  });
  it('should have some pic data', function(){
    expect(mrCard.picData).to.equal('XCFGETRNTU&^$%#');
  });
});
