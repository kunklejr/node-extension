module.exports = {
  isString: function(obj) {
    var self = obj || this;
    return typeof self === 'string';
  },

  isFunction: function(obj) {
    var self = obj || this;
    return typeof self === 'function';
  },

  isArray: function(obj) {
    var self = obj || this;
    return Array.isArray(self);
  },

  isNumber: function(obj) {
    var self = obj || this;
    return typeof self === 'number';
  },

  isObject: function(obj) {
    var self = obj || this;
    return typeof self === 'object';
  }
};

