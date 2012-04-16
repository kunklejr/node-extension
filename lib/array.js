'use strict';

module.exports = {
  contains: function (source, obj) {
    if (arguments.length < 2) {
      obj = source;
      source = this;
    }
    if (!Array.isArray(source)) {
      return false;
    }

    for (var i = 0, l = source.length; i < l; i++) {
      if (source[i] === obj) {
        return true;
      }
    }
    return false;
  },

  isEmpty: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return obj.length < 1;
  },

  sortCaseInsensitive: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return obj.sort(function (a, b) {
      a = String(a).toUpperCase();
      b = String(b).toUpperCase();
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
  },

  first: function (source, fn) {
    if (arguments.length < 2) {
      fn = source;
      source = this;
    }
    for (var i = 0, l = source.length; i < l; i++) {
      if (fn(source[i])) {
        return source[i];
      }
    }
  },

  // fn
  // source, fn
  groupBy: function () {
    var source, fn;
    if (arguments.length === 1) {
      source = this;
      fn = arguments[0];
    } else {
      source = arguments[0];
      fn = arguments[1];
    }
    var results = {};

    var length = source.length;
    for (var i = 0; i < length; i++) {
      var key = fn(source[i]);
      if (key in results) {
        results[key].push(source[i]);
      } else {
        results[key] = [source[i]];
      }
    }
    return results;
  }
};
