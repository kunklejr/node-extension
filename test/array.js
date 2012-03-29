var expect = require('chai').expect;
var arrext = require('../lib/array');

describe('array', function() {
  describe('#contains', function() {
    it('should return false when the array is empty', function(done) {
      expect(arrext.contains([], 1)).to.be.false;
      expect(arrext.contains.call([], 1)).to.be.false;
      done();
    });

    it('should return false when the array does not contain the value', function(done) {
      expect(arrext.contains([1, 2], 3)).to.be.false;
      expect(arrext.contains.call([1, 2], 3)).to.be.false;
      done();
    });

    it('should return true when the array contains the value', function(done) {
      expect(arrext.contains([1, 2], 2)).to.be.true;
      expect(arrext.contains.call([1, 2], 2)).to.be.true;
      done();
    });
  });

  describe('#isEmpty', function() {
    it('should return true when empty', function(done) {
      expect(arrext.isEmpty([])).to.be.true;
      expect(arrext.isEmpty.call([])).to.be.true;
      done();
    });

    it('should return false when not empty', function(done) {
      expect(arrext.isEmpty([1])).to.be.false;
      expect(arrext.isEmpty.call([1])).to.be.false;
      done();
    });
  });

  describe('#first', function() {
    it('should return nothing when empty', function(done) {
      expect(arrext.first([], function() {})).to.not.be.present;
      expect(arrext.first.call([], function() {})).to.not.be.present;
      done();
    });

    it('should return nothing when no match is found', function(done) {
      expect(arrext.first([1, 2], function() { return false; })).to.not.be.present;
      expect(arrext.first.call([1, 2], function() { return false; })).to.not.be.present;
      done();
    });

    it('should the first value for which the passed function returns true', function(done) {
      expect(arrext.first([1, 2, 3], function(item) { return item > 1; })).to.equal(2);
      expect(arrext.first.call([1, 2, 3], function(item) { return item > 1; })).to.equal(2);
      done();
    });
  });
});
