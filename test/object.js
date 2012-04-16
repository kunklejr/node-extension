var expect = require('chai').expect;
var objext = require('../lib/object');

describe('object', function () {
  describe('#isString', function () {
    it('should return false when passed a null or undefined value', function (done) {
      expect(objext.isString(null)).to.be.false;
      expect(objext.isString(undefined)).to.be.false;
      done();
    });

    it('should return true when passed a string', function (done) {
      expect(objext.isString('')).to.be.true;
      expect(objext.isString.call('')).to.be.true;
      done();
    });

    it('should return false when passed anything other than a string', function (done) {
      expect(objext.isString(4)).to.be.false;
      expect(objext.isString([])).to.be.false;
      expect(objext.isString(function () {})).to.be.false;
      expect(objext.isString({})).to.be.false;
      done();
    });
  });

  describe('#isFunction', function () {
    it('should return false when passed a null or undefined value', function (done) {
      expect(objext.isFunction(null)).to.be.false;
      expect(objext.isFunction(undefined)).to.be.false;
      done();
    });

    it('should return true when passed a function', function (done) {
      expect(objext.isFunction(function () {})).to.be.true;
      expect(objext.isFunction.call(function () {})).to.be.true;
      done();
    });

    it('should return false when passed anything other than a function', function (done) {
      expect(objext.isFunction(4)).to.be.false;
      expect(objext.isFunction([])).to.be.false;
      expect(objext.isFunction({})).to.be.false;
      expect(objext.isFunction('')).to.be.false;
      done();
    });
  });

  describe('#isArray', function () {
    it('should return false when passed a null or undefined value', function (done) {
      expect(objext.isArray(null)).to.be.false;
      expect(objext.isArray(undefined)).to.be.false;
      done();
    });

    it('should return true when passed an array', function (done) {
      expect(objext.isArray([])).to.be.true;
      expect(objext.isArray.call([])).to.be.true;
      done();
    });

    it('should return false when passed anything other than an array', function (done) {
      expect(objext.isArray(4)).to.be.false;
      expect(objext.isArray(function () {})).to.be.false;
      expect(objext.isArray({})).to.be.false;
      expect(objext.isArray('')).to.be.false;
      done();
    });
  });

  describe('#isNumber', function () {
    it('should return false when passed a null or undefined value', function (done) {
      expect(objext.isNumber(null)).to.be.false;
      expect(objext.isNumber(undefined)).to.be.false;
      done();
    });

    it('should return true when passed a number', function (done) {
      expect(objext.isNumber(7)).to.be.true;
      expect(objext.isNumber.call(7)).to.be.true;
      done();
    });

    it('should return false when passed anything other than a number', function (done) {
      expect(objext.isNumber(function () {})).to.be.false;
      expect(objext.isNumber([])).to.be.false;
      expect(objext.isNumber({})).to.be.false;
      expect(objext.isNumber('')).to.be.false;
      done();
    });
  });

  describe('#isObject', function () {
    it('should return false when passed a null or undefined value', function (done) {
      expect(objext.isObject(null)).to.be.false;
      expect(objext.isObject(undefined)).to.be.false;
      done();
    });

    it('should return true when passed an object', function (done) {
      expect(objext.isObject({})).to.be.true;
      expect(objext.isObject.call({})).to.be.true;
      done();
    });

    it('should return false when passed anything other than an object', function (done) {
      expect(objext.isObject(function () {})).to.be.false;
      expect(objext.isObject([])).to.be.false;
      expect(objext.isObject(4)).to.be.false;
      expect(objext.isObject('')).to.be.false;
      done();
    });
  });

  describe('#isEmpty', function () {
    it('should return true if passed a null or undefined value', function (done) {
      expect(objext.isEmpty(null)).to.be.true;
      expect(objext.isEmpty.call(null)).to.be.true;
      expect(objext.isEmpty(undefined)).to.be.true;
      expect(objext.isEmpty.call(undefined)).to.be.true;
      done();
    });

    it('should return true if the object has no keys', function (done) {
      expect(objext.isEmpty({})).to.be.true;
      expect(objext.isEmpty.call({})).to.be.true;
      expect(objext.isEmpty({ a: 1 })).to.be.false;
      expect(objext.isEmpty.call({ a: 1 })).to.be.false;
      done();
    });

    it('should return false if not null, undefined, an array, or an object containing keys', function (done) {
      expect(objext.isEmpty(4)).to.be.false;
      expect(objext.isEmpty(function () {})).to.be.false;
      done();
    });

    it('should return true for an empty array', function (done) {
      expect(objext.isEmpty([])).to.be.true;
      expect(objext.isEmpty.call([])).to.be.true;
      expect(objext.isEmpty([1])).to.be.false;
      expect(objext.isEmpty.call([1])).to.be.false;
      done();
    });
  });

  describe('#toArray', function () {
    it('should create an array of key, value objects', function (done) {
      expect(objext.toArray({ a: 1, b: 2 })).to.be.eql([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 }
      ]);
      expect(objext.toArray.call({ a: 1, b: 2 })).to.be.eql([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 }
      ]);
      done();
    });
  });
});
