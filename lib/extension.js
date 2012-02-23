var extensions = {};

var register = exports.register = function (obj, extObj) {
  verifyPresent('Object to be extended cannot be null or undefined', obj);
  verifyPresent('Extensions cannot be null or undefined', extObj);

  if (extensions[obj] === undefined) {
    extensions[obj] = {};
  }

  Object.keys(extObj).forEach(function(ext) {
    extensions[obj][ext] = extObj[ext];
  });
};

var find = exports.find = function (obj) {
  verifyPresent('object argument is required', obj);
  return extensions[obj];
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
  props.forEach(function(prop) {
    obj[prop] = extensions[obj][prop];
  });
}

function removeProps(obj, props) {
  props.forEach(function(prop) {
    delete obj[prop];
  });
}

function getProps(obj, props) {
  if (props === null || props === undefined) {
    var exts = extensions[obj];
    return exts === undefined ? [] : Object.keys(exts);
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
  if (extensions[obj] === undefined || extensions[obj][prop] === undefined) {
    throw new Error(obj + '#' + prop + ' extension not found.');
  }
}

function verifyPresent(message, obj) {
  if (obj === null || obj === undefined) {
    throw new Error(message);
  }
}
