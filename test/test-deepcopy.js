var assert = require('assert'),
    deepcopy = require('../');

suite('deepcopy', function() {

  test('return copy of parameter if parameter is primitive types', function() {
    assert.strictEqual(
        deepcopy(12345),
        12345,
        'deepcopy(12345) should be returned 12345');
    assert.strictEqual(
        deepcopy('abc'),
        'abc',
        'deepcopy("abc") should be returned "abc"');
    assert.strictEqual(
        deepcopy(true),
        true,
        'deepcopy(true) should be returned true');
    assert.strictEqual(
        deepcopy(null),
        null,
        'deepcopy(null) should be returned null');
    assert.strictEqual(
        deepcopy(void 0),
        void 0,
        'deepcopy(undefined) should be returned undefined');
  });

  test('return reference if parameter is Function', function() {
    var copied = deepcopy(f);

    function f() {}

    assert.isTrue(
        copied instanceof Function,
        'instance should be Function');
    assert.strictEqual(
        copied,
        f,
        'deepcopy(function() {}) should be returned function() {} reference');
  });

  test('return deep copy of Date if parameter is Date', function() {
    var date = new Date,
        copied = deepcopy(date);

    assert.isTrue(
        copied instanceof Date,
        'instance should be Date');
    assert.notStrictEqual(
        copied,
        date,
        'deepcopy(date) should not be return date reference');
    assert.deepEqual(
        copied,
        date,
        'deepcopy(date) should be return deep copied date');
  });

  test('return deep copy of RegExp if parameter is RegExp', function() {
    var regexp = /\x00/gi,
        copied = deepcopy(regexp);

    assert.isTrue(
        copied instanceof RegExp,
        'instance should be RegExp');
    assert.notStrictEqual(
        copied,
        regexp,
        'deepcopy(regexp) should not be return regexp reference');
    assert.deepEqual(
        copied,
        regexp,
        'deepcopy(regexp) should be return deep copied regexp');
  });

  test('return deep copy of Array if parameter is Array', function() {
    var array = [
      12345,
      'abc',
      false,
      null,
      void 0,
      function() {},
      new Date,
      /\x00/ig,
      [1, 'a', true, null, void 0, function() {}, new Date, /\x00/ig],
      {
        array: [
          1, 'a', true, null, void 0, function() {}, new Date, /\x00/ig
        ]
      }
    ],
        copied = deepcopy(array);

    assert.isTrue(
        copied instanceof Array,
        'instance should be Array');
    assert.notStrictEqual(
        copied,
        array,
        'deepcopy(array) should not be return array reference');
    assert.deepEqual(
        copied,
        array,
        'deepcopy(array) should be return deep copied array');
  });

  test('return deep copy of Object if parameter is Object', function() {
    var object = {
      number: 12345,
      string: 'abc',
      boolean: false,
      nil: null,
      undef: void 0,
      func: function() {},
      date: new Date,
      regexp: /\x00/ig,
      array: [
        1, 'a', true, null, void 0, function() {}, new Date, /\x00/ig
      ],
      object: {
        a: 1, b: 'a', c: true, d: null, e: void 0, f: function() {}
      }
    },
        copied = deepcopy(object);

    assert.isTrue(
        copied instanceof Object,
        'instance should be Object');
    assert.notStrictEqual(
        copied,
        object,
        'deepcopy(object) should not be return object reference');
    assert.deepEqual(
        copied,
        object,
        'deepcopy(object) should be return deep copied object');
  });

  test('return object if parameter has circular reference', function() {
    assert.doesNotThrow(
        function() {
          var object = { value: 1 },
              copied;

          object.to = object;
          copied = deepcopy(object);

          assert.notStrictEqual(
              copied,
              object,
              'deepcopy should not be return object reference');
          assert.strictEqual(
              copied,
              copied.to,
              'deepcopy should be assigned copied.to to copied');
          assert.deepEqual(
              copied,
              object,
              'deepcopy should be return deep copied object');
        },
        'deepcopy should not be threw error if parameter has circular ' +
            'reference');
  });

});
