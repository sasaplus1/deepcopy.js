(function() {

  'use strict';

  var assert, deepcopy;

  if (typeof exports === 'object') {
    assert = require('power-assert');
    deepcopy = require('../deepcopy');
  } else {
    assert = this.assert;
    deepcopy = this.deepcopy;
  }

  describe('deepcopy()', function() {

    describe('check for some types', function() {

      it('should return primitive types', function() {
        assert(deepcopy(1) === 1);
        assert(deepcopy('A') === 'A');
        assert(deepcopy(true) === true);
        assert(deepcopy(null) === null);
        assert(deepcopy(undefined) === undefined);
        assert(deepcopy(Infinity) === Infinity);
        assert(deepcopy(-Infinity) === -Infinity);
        assert(isNaN(deepcopy(NaN)));
      });

      it('should return Function', function() {
        function fn() {}

        assert(deepcopy(fn) === fn);
      });

      it('should return Date', function() {
        var date = new Date;

        assert(+deepcopy(date) === +date);
      });

      it('should return RegExp', function() {
        var regexp = new RegExp;

        assert(String(deepcopy(regexp)) === String(regexp));
      });

      it('should return Array', function() {
        var array = [];

        assert.deepEqual(deepcopy(array), array);
      });

      it('should return Object', function() {
        var object = {};

        assert.deepEqual(deepcopy(object), object);
      });

      it('should return Buffer', (typeof Buffer === 'function') ? function() {
        var buffer = new Buffer(0);

        assert.deepEqual(deepcopy(buffer), buffer);
      } : undefined);

      it('should return Symbol', (typeof Symbol === 'function') ? function() {
        var symbol = Symbol();

        assert(deepcopy(symbol) === symbol);
      } : undefined);

    });

    describe('check for recursive copy', function() {

      it('should return recursive copy for array', function() {
        var array = [
          [[1], [2], [3]],
          [[4], [5], [6]],
          [[7], [8], [9]]
        ];

        assert.deepEqual(deepcopy(array), array);
      });

      it('should return recursive copy for object', function() {
        var object = {
          a: { a: { a: true }, b: { b: false }, c: { c: null } },
          b: { a: { a: true }, b: { b: false }, c: { c: null } },
          c: { a: { a: true }, b: { b: false }, c: { c: null } }
        };

        assert.deepEqual(deepcopy(object), object);
      });

      it('should return object, it has circular reference', function() {
        var object, copy;

        assert.doesNotThrow(function() {
          object = {};
          object.to = object;
          copy = deepcopy(object);
        });

        assert(copy === copy.to);
      });

      it('should return object, it has symbol', (typeof Symbol === 'function') ?
          function() {
            var object = {},
                a = Symbol.for('a'),
                b = Symbol.for('b'),
                c = Symbol.for('c'),
                copy;

            object[a] = 1;
            object[b] = 2;
            object[c] = 3;

            copy = deepcopy(object);

            assert(copy[a] === object[a]);
            assert(copy[b] === object[b]);
            assert(copy[c] === object[c]);
          } : undefined
      );

    });

    describe('check for duplicate function', function() {

      it('should return array, it has duplicate function', function() {
        var array = [fn, fn],
            copy = deepcopy(array);

        function fn() {}

        assert(copy[0] === copy[1]);
      });

      it('should return object, it has duplicate function', function() {
        var object = { a: fn, b: fn },
            copy = deepcopy(object);

        function fn() {}

        assert(copy.a === copy.b);
      });

      it('should return object, it has symbol', (typeof Symbol === 'function') ?
          function() {
            var object = {},
                a = Symbol.for('a'),
                b = Symbol.for('b'),
                copy;

            function fn() {}

            object[a] = fn;
            object[b] = fn;

            copy = deepcopy(object);

            assert(copy[a] === copy[b]);
          } : undefined
      );

    });

  });

}).call(this);
