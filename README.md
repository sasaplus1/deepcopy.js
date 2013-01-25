# deepcopy [![Build Status](https://travis-ci.org/sasaplus1/deepcopy.png)](https://travis-ci.org/sasaplus1/deepcopy)

deep copy module for node.js

## Installation

```sh
$ npm install deepcopy
```

## Usage

```js
var util = require('util'),
    deepcopy = require('deepcopy');

var copied,
    obj = {
      num: 123,
      str: 'a',
      bool: false,
      nil: null,
      undef: undefined,
      now: new Date,
      reg: /node/ig,
      arr: [
        true, false, null
      ],
      obj: {
        aaa: 1,
        bbb: 2,
        ccc: 3
      }
    };

copied = deepcopy(obj);

obj.num = 555;
obj.str = 'A';
obj.bool = true;

console.log(copied === obj);  // false

console.log(util.inspect(obj, false, null, true));
// { num: 555,
//   str: 'A',
//   bool: true,
//   nil: null,
//   undef: undefined,
//   now: Sat Jan 26 2013 00:21:37 GMT+0900 (JST),
//   reg: /node/gi,
//   arr: [ true, false, null ],
//   obj: { aaa: 1, bbb: 2, ccc: 3 } }

console.log(util.inspect(copied, false, null, true));
// { num: 123,
//   str: 'a',
//   bool: false,
//   nil: null,
//   undef: undefined,
//   now: Sat Jan 26 2013 00:21:37 GMT+0900 (JST),
//   reg: /node/gi,
//   arr: [ true, false, null ],
//   obj: { aaa: 1, bbb: 2, ccc: 3 } }
```

## Functions

### deepcopy(targetObject)

  * `targetObject` any types - deep copy target
  * `return` `targetObject` types - copied object

return deep copied object from targetObject.

## Test

```sh
$ npm install
$ npm test
```

## License

The MIT License. Please see LICENSE file.
