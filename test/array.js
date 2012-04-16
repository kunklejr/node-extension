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
    })
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

  describe('#sortCaseInsensitive', function() {
    it('should return true when empty', function(done) {
      var result = arrext.sortCaseInsensitive(['az', 'Ab', 'aa', 1]);
      expect(result).to.eql([1, 'aa', 'Ab', 'az']);
      done();
    });
  });

  describe('#groupBy', function() {
    it('should group by name', function(done) {
      var result = arrext.groupBy([
        { name: 'bin1', value: 1 },
        { name: 'bin2', value: 2 },
        { name: 'bin1', value: 3 },
        { name: 'bin3', value: 4 },
        { name: 'bin2', value: 5 }
      ], function(item) { return item.name });

      expect(result).to.eql({
        'bin1': [
          { name: 'bin1', value: 1 },
          { name: 'bin1', value: 3 }
        ],
        'bin2': [
          { name: 'bin2', value: 2 },
          { name: 'bin2', value: 5 }
        ],
        'bin3': [
          { name: 'bin3', value: 4 }
        ]
      });
      done();
    });

    it('should group by name (this)', function(done) {
      var result = arrext.groupBy.call([
        { name: 'bin1', value: 1 },
        { name: 'bin2', value: 2 },
        { name: 'bin1', value: 3 },
        { name: 'bin3', value: 4 },
        { name: 'bin2', value: 5 }
      ], function(item) { return item.name });

      expect(result).to.eql({
        'bin1': [
          { name: 'bin1', value: 1 },
          { name: 'bin1', value: 3 }
        ],
        'bin2': [
          { name: 'bin2', value: 2 },
          { name: 'bin2', value: 5 }
        ],
        'bin3': [
          { name: 'bin3', value: 4 }
        ]
      });
      done();
    });
  });
});
