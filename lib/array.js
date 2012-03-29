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

  isEmpty: function(obj) {
    obj = arguments.length > 0 ? obj : this;
    return obj.length < 1;
  },

  first: function(source, fn) {
    if (arguments.length < 2) {
      fn = source;
      source = this;
    }
    for (var i = 0, l = source.length; i < l; i++) {
      if (fn(source[i])) {
        return source[i];
      }
    }
  }
};
