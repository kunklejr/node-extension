var expect = require('chai').expect;
var arrext = require('../lib/array');

describe('array', function() {
  describe('#contains', function() {
    it('should return false when the array is empty', function(done) {
      expect(arrext.contains([], 1)).to.be.false;
      expect(arrext.contains.call([], 1)).to.be.false;
      done();
    })

    it('should return false when the array does not contain the value', function(done) {
      expect(arrext.contains([1, 2], 3)).to.be.false;
      expect(arrext.contains.call([1, 2], 3)).to.be.false;
      done();
    })

    it('should return true when the array contains the value', function(done) {
      expect(arrext.contains([1, 2], 2)).to.be.true;
      expect(arrext.contains.call([1, 2], 2)).to.be.true;
      done();
    })
  })

  describe('#isEmpty', function() {
    it('should return true when empty', function(done) {
      expect(arrext.isEmpty([])).to.be.true;
      expect(arrext.isEmpty.call([])).to.be.true;
      done();
    })

    it('should return false when not empty', function(done) {
      expect(arrext.isEmpty([1])).to.be.false;
      expect(arrext.isEmpty.call([1])).to.be.false;
      done();
    })
  })
})
