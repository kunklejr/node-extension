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

    var length = source.length;
    for (var i = 0; i < length; i++) {
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
