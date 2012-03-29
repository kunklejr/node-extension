'use strict';

var objext = require('./object');
var extensionKeys = [];
var extensionObjs = [];

var register = exports.register = function (obj, extObj) {
  verifyPresent('Object to be extended cannot be null or undefined', obj);
  verifyPresent('Extensions cannot be null or undefined', extObj);

  if (objext.isEmpty(extObj)) {
    return;
  }

  var index = extensionKeys.indexOf(obj);
  if (index > -1) {
    Object.keys(extObj).forEach(function(ext) {
      extensionObjs[index][ext] = extObj[ext];
    });
  } else {
    extensionKeys.push(obj);
    extensionObjs.push(extObj);
  }
};

var registerAndUse = exports.registerAndUse = function (obj, extObj) {
  register(obj, extObj);
  use(obj);
};

var find = exports.find = function (obj) {
  verifyPresent('object argument is required', obj);

  var index = extensionKeys.indexOf(obj);
  if (index > -1) {
    return extensionObjs[index];
  } else {
    return undefined;
  }
};

var use = exports.use = function (obj, props, fn) {
  verifyPresent('Object on which to use extensions cannot be null or undefined', obj);

  if (typeof props === 'function') {
    fn = props;
    props = undefined;
  }

  var props = getProps(obj, props);

  if (fn === undefined) {
    addProps(obj, props);
  } else {
    try {
      addProps(obj, props);
      fn();
    } finally {
      removeProps(obj, props);
    }
  }
};

function addProps(obj, props) {
  var index = extensionKeys.indexOf(obj);
  if (index < 0) {
    return;
  }

  props.forEach(function(prop) {
    var ext = extensionObjs[index][prop];
    if (ext) {
      Object.defineProperty(obj, prop, {
        value: ext,
        configurable: true
      });
    }
  });
}

function removeProps(obj, props) {
  props.forEach(function(prop) {
    if (obj[prop]) {
      delete obj[prop];
    }
  });
}

function getProps(obj, props) {
  if (props === null || props === undefined) {
    var index = extensionKeys.indexOf(obj);
    return index > -1 ? Object.keys(extensionObjs[index]) : [];
  }

  if (!Array.isArray(props)) {
    props = [props];
  }

  props.forEach(verifyProp.bind(this, obj));
  props = props.filter(function(prop) {
    return obj[prop] === undefined;
  });

  return props;
}

function verifyProp(obj, prop) {
  var index = extensionKeys.indexOf(obj);
  if (index < 0 || extensionObjs[index][prop] === undefined) {
    throw new Error(obj + '#' + prop + ' extension not found.');
  }
}

function verifyPresent(message, obj) {
  if (obj === null || obj === undefined) {
    throw new Error(message);
  }
}

exports.string = require('./string');
exports.object = require('./object');
exports.array = require('./array');
