var extension = require('../extension');

function register(obj, extensions) {
  Object.keys(extensions).forEach(function(ext) {
    extension.register(obj, ext, extensions[ext]);
  });
}

register(String.prototype, require('./string.prototype.js'));

