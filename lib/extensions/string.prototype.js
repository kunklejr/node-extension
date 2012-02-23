module.exports = {
  contains: function(str, options) {
    options ||= {};
    var self = options.ignoreCase ? this.toLowerCase() : this;
    var str = options.ignoreCase ? str.toLowerCase(): str;
    return self.indexOf(str) !== -1;
  },

  startsWith: function(str, options) {
    options ||= {};
    var self = options.ignoreCase ? this.toLowerCase() : this;
    var str = options.ignoreCase ? str.toLowerCase(): str;
    var match = self.match("^" + str);
    return match && match[0] === str;
  },

  endsWith: function(str, options) {
    options ||= {};
    var self = options.ignoreCase ? this.toLowerCase() : this;
    var str = options.ignoreCase ? str.toLowerCase(): str;
    var match = self.match(str + "$");
    return match && match[0] === str;
  }
};


