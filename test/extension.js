var expect = require('chai').expect;
var ext = require('../lib/extension');

describe('extension', function () {
  describe('#register', function () {
    it('should throw an exception if given a null or undefined object to extend', function (done) {
      expect(ext.register.bind(this, null)).to.
      throw(Error);
      expect(ext.register.bind(this, undefined)).to.
      throw(Error);
      done();
    });

    it('should throw an exception if given a null or undefined extension object', function (done) {
      expect(ext.register.bind(this, String.prototype, null)).to.
      throw(Error);
      expect(ext.register.bind(this, String.prototype, undefined)).to.
      throw(Error);
      done();
    });

    it('should do nothing if passed an empty extension object', function (done) {
      var obj = {};
      ext.register(obj, {});
      ext.use(obj);
      expect(Object.keys(obj)).to.be.empty;
      done();
    });

    it('should create a new empty set of extensions the first time an object is extended', function (done) {
      var obj = {};
      var exts = ext.find(obj);
      expect(exts).to.be.undefined;
      ext.register(obj, { hello: true });
      exts = ext.find(obj);
      expect(exts).to.have.keys('hello');
      done();
    });

    it('should register the extension given valid arguments', function (done) {
      var obj = {};
      ext.register(obj, { hello: true });
      ext.register(obj, { goodbye: true });
      var exts = ext.find(obj);
      expect(Object.keys(exts)).to.have.length(2);
      expect(exts).to.have.keys('hello', 'goodbye');
      expect(exts).to.have.keys('hello', 'goodbye');
      expect(exts.hello).to.be.true;
      expect(exts.goodbye).to.be.true;
      done();
    });
  });

  describe('#find', function () {
    it('should throw an exception if passed a null or undefined value', function (done) {
      expect(ext.find.bind(this, null)).to.
      throw(Error);
      expect(ext.find.bind(this, undefined)).to.
      throw(Error);
      done();
    });

    it('should return undefined if no extensions are registered for the object', function (done) {
      expect(ext.find({})).to.be.undefined;
      done();
    });

    it('should return the registered extensions as an object', function (done) {
      var obj = {};
      ext.register(obj, { hello: true });
      ext.register(obj, { goodbye: true });
      var exts = ext.find(obj);
      expect(Object.keys(exts)).to.have.length(2);
      expect(exts).to.have.keys('hello', 'goodbye');
      expect(exts).to.have.keys('hello', 'goodbye');
      expect(exts.hello).to.be.true;
      expect(exts.goodbye).to.be.true;
      done();
    });
  });

  describe('#use', function () {
    it('should throw an exception if given a null or undefined object on which to use extensions', function (done) {
      expect(ext.use.bind(this, null)).to.
      throw(Error);
      expect(ext.use.bind(this, undefined)).to.
      throw(Error);
      done();
    });

    it('should permantly apply an extension to an object if not passed a scoping function', function (done) {
      var obj = {};
      ext.register(obj, { hello: function () {
        done();
      }});
      expect(obj.hello).to.be.undefined;
      ext.use(obj, 'hello');
      expect(obj.hello).not.to.be.undefined;
      obj.hello();
    });

    it('should remove used extensions from an object after the scoping function has executed', function (done) {
      var obj = {};
      var run = false;
      ext.register(obj, { hello: function () {
        run = true;
      }});
      expect(obj.hello).to.be.undefined;
      ext.use(obj, 'hello', function () {
        obj.hello();
      });
      expect(obj.hello).to.be.undefined;
      expect(run).to.be.true;
      done();
    });

    it('should not overwrite existing properties', function (done) {
      var obj = {
        hello: true
      };
      ext.register(obj, { hello: false });

      ext.use(obj, 'hello');
      expect(obj.hello).to.be.true;
      ext.use(obj, 'hello', function () {
        expect(obj.hello).to.be.true;
      });
      done();
    });

    it('should allow multiple property extensions to be applied at once within a scope', function (done) {
      var obj = {};
      var runHello = false;
      var runWorld = false;

      ext.register(obj, { hello: function () {
        runHello = true;
      }});
      ext.register(obj, { world: function () {
        runWorld = true;
      }});

      expect(obj.hello).to.be.undefined;
      expect(obj.world).to.be.undefined;

      ext.use(obj, ['hello', 'world'], function () {
        obj.hello();
        obj.world();
      });

      expect(obj.hello).to.be.undefined;
      expect(obj.world).to.be.undefined;
      expect(runHello).to.be.true;
      expect(runWorld).to.be.true;
      done();
    });

    it('should use all registered extensions if none are specified', function (done) {
      var obj = {};
      var runHello = false;
      var runWorld = false;

      ext.register(obj, { hello: function () {
        runHello = true;
      }});
      ext.register(obj, { world: function () {
        runWorld = true;
      }});

      expect(obj.hello).to.be.undefined;
      expect(obj.world).to.be.undefined;

      ext.use(obj, function () {
        obj.hello();
        obj.world();
      });

      expect(obj.hello).to.be.undefined;
      expect(obj.world).to.be.undefined;
      expect(runHello).to.be.true;
      expect(runWorld).to.be.true;
      done();
    })

    it('should not show up in a foreach', function (done) {
      var obj = {};

      ext.register(obj, { hello: function () {
      }});

      ext.use(obj, function () {
        var keys = [];
        for (var k in obj) {
          keys.push(k);
        }
        expect(keys).to.be.eql([]);
        expect(obj.hello).not.to.be.undefined;
        done();
      });
    });
  });

  describe('#registerAndUse', function () {
    it('should throw an exception if given a null or undefined object to extend', function (done) {
      expect(ext.registerAndUse.bind(this, null)).to.
      throw(Error);
      expect(ext.registerAndUse.bind(this, undefined)).to.
      throw(Error);
      done();
    });

    it('should throw an exception if given a null or undefined extension object', function (done) {
      expect(ext.registerAndUse.bind(this, String.prototype, null)).to.
      throw(Error);
      expect(ext.registerAndUse.bind(this, String.prototype, undefined)).to.
      throw(Error);
      done();
    });

    it('should do nothing if passed an empty extension object', function (done) {
      var obj = {};
      ext.registerAndUse(obj, {});
      expect(Object.keys(obj)).to.be.empty;
      done();
    });

    it('should not have a conflict with keys having the same toString value', function (done) {
      var obj1 = {};
      var obj2 = {};
      ext.registerAndUse(obj1, { a: true });
      ext.registerAndUse(obj2, { b: true });
      expect(obj1.a).to.be.true;
      expect(obj1.b).to.be.undefined;
      expect(obj2.a).to.be.undefined;
      expect(obj2.b).to.be.true;
      done();
    });
  });
});
