var expect = require('chai').expect;
var strext = require('../lib/string');

describe('string', function() {
  describe('#contains', function() {
    it('should return false if passed a null or undefined string argument', function(done) {
      expect(strext.contains(null)).to.be.false;
      expect(strext.contains(undefined)).to.be.false;
      done();
    });

    it('should return false if not passed a string', function(done) {
      expect(strext.contains([1, 2, 3])).to.be.false;
      done();
    });

    it('should detect a substring at the beginning of the source string', function(done) {
      expect(strext.contains('hola', 'ho')).to.be.true;
      expect(strext.contains('hola', 'Ho')).to.be.false;
      done();
    });

    it('should detect a substring at the beginning of the source string while ignoring case', function(done) {
      expect(strext.contains('hola', 'Ho', { ignoreCase: true })).to.be.true;
      expect(strext.contains('hola', 'ho', { ignoreCase: true })).to.be.true;
      done();
    });

    it('should detect a substring at the end of the source string', function(done) {
      expect(strext.contains('hola', 'la')).to.be.true;
      expect(strext.contains('hola', 'lA')).to.be.false;
      done();
    });

    it('should detect a substring at the end of the source string while ignoring case', function(done) {
      expect(strext.contains('hola', 'lA', { ignoreCase: true })).to.be.true;
      expect(strext.contains('hola', 'la', { ignoreCase: true })).to.be.true;
      done();
    });

    it('should detect a substring somewhere in the middle of the source string', function(done) {
      expect(strext.contains('hola', 'ol')).to.be.true;
      expect(strext.contains('hola', 'oL')).to.be.false;
      done();
    });

    it('should detect a substring somewhere in the middle of the source string while ignoring case', function(done) {
      expect(strext.contains('hola', 'oL', { ignoreCase: true })).to.be.true;
      expect(strext.contains('hola', 'ol', { ignoreCase: true })).to.be.true;
      done();
    });

    it('should be callable with or without a source string', function(done) {
      var source = 'hola';
      expect(strext.contains(source, 'ho')).to.be.true;
      expect(strext.contains(source, 'Ho', { ignoreCase: true })).to.be.true;
      expect(strext.contains.call(source, 'ho')).to.be.true;
      expect(strext.contains.call(source, 'Ho', { ignoreCase: true })).to.be.true;
      done();
    });
  })

  describe('#startsWith', function() {
    it('should return false if passed a null or undefined string argument', function(done) {
      expect(strext.startsWith(null)).to.be.false;
      expect(strext.startsWith(undefined)).to.be.false;
      done();
    });

    it('should return false if not passed a string', function(done) {
      expect(strext.startsWith([1, 2, 3])).to.be.false;
      done();
    });

    it('should detect a substring at the beginning of the source string', function(done) {
      expect(strext.startsWith('hola', 'ho')).to.be.true;
      expect(strext.startsWith('hola', 'ol')).to.be.false;
      expect(strext.startsWith('hola', 'Ho')).to.be.false;
      done();
    });

    it('should detect a substring at the beginning of the source string while ignoring case', function(done) {
      expect(strext.startsWith('hola', 'ho', { ignoreCase: true })).to.be.true;
      expect(strext.startsWith('hola', 'ol', { ignoreCase: true })).to.be.false;
      expect(strext.startsWith('hola', 'Ho', { ignoreCase: true })).to.be.true;
      done();
    });

    it('should be callable with or without a source string', function(done) {
      var source = 'hola';
      expect(strext.startsWith(source, 'ho')).to.be.true;
      expect(strext.startsWith(source, 'Ho', { ignoreCase: true })).to.be.true;
      expect(strext.startsWith(source, 'ol')).to.be.false;
      expect(strext.startsWith.call(source, 'ho')).to.be.true;
      expect(strext.startsWith.call(source, 'Ho', { ignoreCase: true })).to.be.true;
      expect(strext.startsWith.call(source, 'ol')).to.be.false;
      done();
    });
  })

  describe('#endsWith', function() {
    it('should return false if passed a null or undefined string argument', function(done) {
      expect(strext.endsWith(null)).to.be.false;
      expect(strext.endsWith(undefined)).to.be.false;
      done();
    });

    it('should return false if not passed a string', function(done) {
      expect(strext.endsWith([1, 2, 3])).to.be.false;
      done();
    });

    it('should detect a substring at the end of the source string', function(done) {
      expect(strext.endsWith('hola', 'la')).to.be.true;
      expect(strext.endsWith('hola', 'ol')).to.be.false;
      expect(strext.endsWith('hola', 'LA')).to.be.false;
      done();
    });

    it('should detect a substring at the end of the source string while ignoring case', function(done) {
      expect(strext.endsWith('hola', 'la', { ignoreCase: true })).to.be.true;
      expect(strext.endsWith('hola', 'ol', { ignoreCase: true })).to.be.false;
      expect(strext.endsWith('hola', 'La', { ignoreCase: true })).to.be.true;
      done();
    });

    it('should be callable with or without a source string', function(done) {
      var source = 'hola';
      expect(strext.endsWith(source, 'la')).to.be.true;
      expect(strext.endsWith(source, 'lA', { ignoreCase: true })).to.be.true;
      expect(strext.endsWith(source, 'lA')).to.be.false;
      expect(strext.endsWith.call(source, 'la')).to.be.true;
      expect(strext.endsWith.call(source, 'lA', { ignoreCase: true })).to.be.true;
      expect(strext.endsWith.call(source, 'lA')).to.be.false;
      done();
    });
  });
});
