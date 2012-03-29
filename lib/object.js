'use strict';

module.exports = {
  isString: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return typeof obj === 'string';
  },

  isFunction: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return typeof obj === 'function';
  },

  isArray: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return Array.isArray(obj);
  },

  isNumber: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return typeof obj === 'number';
  },

  isObject: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    return obj !== null &&
      !Array.isArray(obj) &&
      typeof obj === 'object';
  },

  isEmpty: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    if (obj === null || obj === undefined) {
      return true;
    }
    if (module.exports.isObject(obj)) {
      return Object.keys(obj).length < 1;
    } else if (Array.isArray(obj)) {
      return obj.length < 1;
    } else {
      return false;
    }
  },

  toArray: function (obj) {
    obj = arguments.length > 0 ? obj : this;
    var results = [];
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) {
        continue;
      }
      results.push({
        key: k,
        value: obj[k]
      })
    }
    return results;
  }
};

