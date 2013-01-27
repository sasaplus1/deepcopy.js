# deepcopy [![Build Status](https://travis-ci.org/sasaplus1/deepcopy.png)](https://travis-ci.org/sasaplus1/deepcopy)

deep copy module for node.js

## Installation

```sh
$ npm install deepcopy
```

## Usage

```js
var deepcopy = require('deepcopy');

var source = {
  data: {
    num: 123,
    str: 'a',
    now: new Date,
    reg: /node/ig,
    arr: [ true, false, null, undefined ],
    obj: { aaa: 1, bbb: 2, ccc: 3 }
  }
};

var shallow = source,
    deep = deepcopy(source);

delete source.data;

console.dir(source);
// {}
console.dir(shallow);
// {}
console.dir(deep);
// { data:
//    { num: 123,
//      str: 'a',
//      now: Sun Jan 27 2013 23:31:12 GMT+0900 (JST),
//      reg: /node/gi,
//      arr: [ true, false, null, undefined ],
//      obj: { aaa: 1, bbb: 2, ccc: 3 } } }
```

```js
var deepcopy = require('deepcopy');

var a = {},
    b = {};

a.to = b;
b.to = a;

try {
  deepcopy(a);
} catch (e) {
  console.error(e);  // [RangeError: Maximum call stack size exceeded]
}
```

## Functions

### deepcopy(targetObject)

  * `targetObject` any types - copy target
  * `return` targetObject types - copied value

return deep copy if `targetObject` is Date, RegExp or primitive types.
return shallow copy if `targetObject` is function.

this function throws RangeError if targetObject has circular reference.

## Test

```sh
$ npm install
$ npm test
```

## License

The MIT License. Please see LICENSE file.
