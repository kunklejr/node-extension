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
  }
};

