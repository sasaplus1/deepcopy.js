# deepcopy.js

[![Build Status](https://travis-ci.org/sasaplus1/deepcopy.js.svg)](https://travis-ci.org/sasaplus1/deepcopy.js)
[![Dependency Status](https://gemnasium.com/sasaplus1/deepcopy.js.svg)](https://gemnasium.com/sasaplus1/deepcopy.js)
[![NPM version](https://badge.fury.io/js/deepcopy.js.svg)](http://badge.fury.io/js/deepcopy.js)
[![Bower version](https://badge.fury.io/bo/deepcopy.js.svg)](http://badge.fury.io/bo/deepcopy.js)

deep copy for any data

## Installation

### npm

```sh
$ npm install deepcopy
```

### bower

```sh
$ bower install deepcopy
```

## Usage

### node.js

```js
var deepcopy = require('deepcopy');
```

### browser

```html
<script src="deepcopy.min.js"></script>
```

define `deepcopy` by `define()` if using AMD loader.

otherwise `deepcopy` export to global.

### Example

```js
var data, shallow, deep;

data = {
  objects: {
    array: [
      null, undefined, new Date, /deepcopy/ig
    ],
    object: {
      number: NaN,
      string: 'A',
      boolean: true
    },
    to: null
  }
};

// circular reference
data.objects.to = data;

// shallow copy and deep copy
shallow = data;
deep = deepcopy(data);

// remove entry
delete data.objects;

// results
console.log(data);
// {}
console.log(shallow);
// {}
console.log(require('util').inspect(deep, { depth: null }));
// { objects:
//    { array:
//       [ null,
//         undefined,
//         Sat Jan 10 2015 03:18:32 GMT+0900 (JST),
//         /deepcopy/gi ],
//      object: { number: NaN, string: 'A', boolean: true },
//      to: [Circular] } }
```

## Functions

### deepcopy(value)

* `value`
  * `*` - copy target value
* `return`
  * `*` - deep copied value

return deep copied value.

supported types are below:

* Number
* String
* Boolean
* Null
* Undefined
* Function (shallow copy)
* Date
* RegExp
* Array
  * recursive copy
  * also can copy if it has circular reference
* Object
  * recursive copy
  * also can copy if it has circular reference
* Buffer (node.js only)

## Test

### node.js

```sh
$ npm install
$ npm test
```

### browser

```sh
$ npm install
$ npm run bower
$ npm run testem
```

## Contributors

* [kjirou](https://github.com/kjirou)

## License

The MIT license. Please see LICENSE file.
