'use strict';

var objext = require('./object');

module.exports = {
  contains: function contains(source, string, options) {
    return match.call(this, source, string, options, function(src, str) {
      return src.indexOf(str) > -1;
    });
  },

  startsWith: function(source, string, options) {
    return match.call(this, source, string, options, function(src, str) {
      return src.indexOf(str) === 0;
    });
  },

  endsWith: function(source, string, options) {
    return match.call(this, source, string, options, function(src, str) {
      return src.lastIndexOf(str) === (src.length - str.length);
    });
  },

  capitalize: function(source) {
    if (source === null) {
      return null;
    }
    if (source === '') {
      return source;
    }

    source = source || this;

    if (source.length === 1) {
      return source.toUpperCase()
    }
    return source.substring(0, 1).toUpperCase() + source.substring(1);
  }
};

function match(source, str, options, fn) {
  if (isNotPresent(source)) {
    return false;
  }
  if (this.constructor === String) {
    options = str;
    str = source;
    source = this;
  }
  if (!objext.isString(str)) {
    return false;
  }

  options = options || {};
  source = options.ignoreCase ? source.toLowerCase() : source;
  str = options.ignoreCase ? str.toLowerCase(): str;

  return fn(source, str);
}

function isNotPresent(obj) {
  return obj === null || obj === undefined;
}

