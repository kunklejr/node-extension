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

    it('should return true if passed a string with multiple matches', function(done) {
      expect(strext.endsWith('test test', 'test')).to.be.true;
      done();
    })

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

  describe('#capitalize', function() {
    it('should return null if passed a null', function(done) {
      expect(strext.capitalize(null)).to.be.null;
      done();
    });

    it('should do nothing to a zero length string', function(done) {
      expect(strext.capitalize('')).to.equal('');
      expect(strext.capitalize.call('')).to.equal('');
      done();
    });

    it('should capitalize the only character in a string with length one', function(done) {
      expect(strext.capitalize('a')).to.equal('A');
      expect(strext.capitalize.call('a')).to.equal('A');
      done();
    });

    it('should only capitalize the first character of a multi-character string', function(done) {
      expect(strext.capitalize('hello')).to.equal('Hello');
      expect(strext.capitalize.call('hello')).to.equal('Hello');
      expect(strext.capitalize('GOODBYE')).to.equal('GOODBYE');
      expect(strext.capitalize.call('GOODBYE')).to.equal('GOODBYE');
      done();
    });
  });

  describe('#decapitalize', function() {
    it('should return null if passed a null', function(done) {
      expect(strext.decapitalize(null)).to.be.null;
      done();
    });

    it('should do nothing to a zero length string', function(done) {
      expect(strext.decapitalize('')).to.equal('');
      expect(strext.decapitalize.call('')).to.equal('');
      done();
    });

    it('should capitalize the only character in a string with length one', function(done) {
      expect(strext.decapitalize('A')).to.equal('a');
      expect(strext.decapitalize.call('A')).to.equal('a');
      done();
    });

    it('should only capitalize the first character of a multi-character string', function(done) {
      expect(strext.decapitalize('Hello')).to.equal('hello');
      expect(strext.decapitalize.call('Hello')).to.equal('hello');
      expect(strext.decapitalize('GOODBYE')).to.equal('gOODBYE');
      expect(strext.decapitalize.call('GOODBYE')).to.equal('gOODBYE');
      done();
    });
  });

  describe('#camelize', function() {
    it('should return null if passed a null', function(done) {
      expect(strext.camelize(null)).to.be.null;
      done();
    });

    it('should do nothing to a zero length string', function(done) {
      expect(strext.camelize('')).to.equal('');
      expect(strext.camelize.call('')).to.equal('');
      done();
    });

    it('should lowercase the only character in a string with length one', function(done) {
      expect(strext.camelize('A')).to.equal('a');
      expect(strext.camelize.call('a')).to.equal('a');
      done();
    });

    it('should camelize a string separated by dashes', function(done) {
      expect(strext.camelize('prop-name')).to.equal('propName');
      expect(strext.camelize.call('Prop-NAME')).to.equal('propNAME');
      done();
    });

    it('should camelize a string separated by underscores', function(done) {
      expect(strext.camelize('prop__name')).to.equal('propName');
      expect(strext.camelize.call('Prop_NAME')).to.equal('propNAME');
      done();
    });
  });
});
