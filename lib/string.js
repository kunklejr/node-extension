'use strict';

var objext = require('./object');

exports.contains = function (source, string, options) {
  return match.call(this, source, string, options, function(src, str) {
    return src.indexOf(str) > -1;
  });
};

exports.startsWith = function (source, string, options) {
  return match.call(this, source, string, options, function(src, str) {
    return src.indexOf(str) === 0;
  });
};

exports.endsWith = function (source, string, options) {
  return match.call(this, source, string, options, function(src, str) {
    return src.lastIndexOf(str) === (src.length - str.length);
  });
};

exports.capitalize = function (source) {
  if (source === null) {
    return null;
  }
  if (source === '') {
    return source;
  }

  source = source || this;

  if (source.length === 1) {
    return source.toUpperCase();
  }
  return source.substring(0, 1).toUpperCase() + source.substring(1);
};

exports.decapitalize = function (source) {
  if (source === null) {
    return null;
  }
  if (source === '') {
    return source;
  }

  source = source || this;

  if (source.length === 1) {
    return source.toLowerCase();
  }
  return source.substring(0, 1).toLowerCase() + source.substring(1);
};

exports.camelize = function (source) {
  if (source === null) {
    return null;
  }
  if (source === '') {
    return source;
  }

  source = source || this;

  if (source.length < 2) {
    return source.toLowerCase();
  }

  var parts = source.split(/[-_]+/);
  parts[0] = parts[0].substring(0, 1).toLowerCase() + parts[0].substring(1);

  for (var i = 1; i < parts.length; i++) {
    parts[i] = exports.capitalize(parts[i]);
  }

  return parts.join('');
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

