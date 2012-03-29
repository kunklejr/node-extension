# extension

Framework for selectively extending JavaScript objects

## Installation

    $ npm install extension

## Usage

The extension module is pretty flexible and can be used in several different ways. The first method allows you to register extensions for certain object types for use later in your code.

```javascript
var ext = require('extension');

// register some built in extensions
ext.register(String.prototype, ext.string);

// register your own custom extensions
ext.register(String.prototype, {
  echo: function() {
	console.log(this);
  },

  cap: function() {
	console.log(this.toUpperCase());
  }
});
```

Once extensions are registered, they can be used globally

```javascript
// enable extensions registered against 
// String.prototype for duration of program
ext.use(String.prototype)
var str = 'hello world';
str.echo(); // prints hello world to the console
```

or within the scope of a function. Please note that any async callbacks within the scope function will **not** see the object extensions.

```javascript
// enable extensions registered against 
// String.prototype within function scope
var str = 'hello world';

ext.use(String.prototype, function() {
  str.echo(); // prints 'hello world' to the console
});

str.echo(); // TypeError: Object has no method 'echo'
```

You don't even have to use all the extensions registered for an object. You can pick and choose only the ones you like

```javascript
var str = 'hello world';

ext.use(String.prototype, ['echo']); // use only the echo extension method
str.echo(); // prints 'hello world' to the console
str.cap(); // TypeError: Object has no method 'cap'

ext.use(String.prototype, ['cap'], function() { // use cap extension within function scope
  str.echo(); // prints 'hello world' to the console
  str.cap(); // prints 'HELLO WORLD' to the console
});

str.cap(); // TypeError: Object has no method 'cap'
```

The examples above demonstrate extending built-in JavaScript object prototypes, but extensions can be registered against any object.

```javascript
var myObj = {};

ext.register(myObj, {
  say: function(text) {
	console.log(text);
  }
});
ext.use(myObj);

myObj.say('hello'); // prints 'hello' to the console
var newObj = {};
newObj.say('hello'); // TypeError: Object has no method 'say'
```

There are many built-in extension methods, which are documented below and can be found in the `lib/` directory of this project. If you'd like to use them directly without having to first register them, you can do that too.

```javascript
var strext = require('extension').string;
var objext = require('extension').object;

strext.contains('hello world', 'hello'); // true
objext.isString('hello world'); // true
```

## Extension API

### register(object, extensionObject)

Register properties of extensionObject as extensions to the object argument

__Arguments__

* object - the object against which to register extensions
* extensionObject - Object containing extension properties/method

### use(object [, properties] [, scopeFunction])

Use the specified registered extensions for the given object, optionally only within the scope of a provided function.

__Arguments__

* object - the object whose registered extensions you wish to use
* properties - an optional array of property/method names representing a subset of the registered extensions you'd like to use
* scopeFunction - an optional function within which the specified registered extensions will be applied. They are removed after the method returns or throws an exception.

### registerAndUse(object, extensionObject)

Register properties of extensionObject as extensions to the object argument and set them up for use. It's the equivalent of calling `#register` followed immediately by `#use` without the scoping function argument.

__Arguments__

* object - the object against which to register extensions
* extensionObject - Object containing extension properties/method

### find(object)

Find all the extension properties/methods registered against the given object. The return value is an object containing all the extension properties/methods.

__Arguments__

* object - the object against which you wish to find registered extensions


## Built-in Extensions

Coming soon! Please see files in the lib/ directory in the meantime.

## License

(The MIT License)

Copyright (c) 2012 Near Infinity Corporation

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

