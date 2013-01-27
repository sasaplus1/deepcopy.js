var assert = require('assert'),
    deepcopy = require('../');

suite('deepcopyのテスト', function() {

  test('プリミティブ型と関数はそのまま返すこと', function() {
    assert.strictEqual(deepcopy(1234), 1234,
        'deepcopy(1234) should be return 1234');
    assert.strictEqual(deepcopy('aa'), 'aa',
        'deepcopy("aa") should be return "aa"');
    assert.strictEqual(deepcopy(true), true,
        'deepcopy(true) should be return true');
    assert.strictEqual(deepcopy(null), null,
        'deepcopy(null) should be return null');
    assert.strictEqual(deepcopy(void 0), void 0,
        'deepcopy(undefined) should be return undefined');
    assert.strictEqual(deepcopy(func), func,
        'deepcopy(function) should be return function');

    function func() {}
  });

  test('DateとRegExpはディープコピーをして返すこと', function() {
    var date = new Date,
        regexp = /regexp/ig,
        deepCopiedDate = deepcopy(date),
        deepCopiedRegExp = deepcopy(regexp);

    assert.notStrictEqual(deepCopiedDate, date,
        'copied value (Date) is not equal instance of target.');
    assert.notStrictEqual(deepCopiedRegExp, regexp,
        'copied value (RegExp) is not equal instance of target.');
    assert.deepEqual(deepCopiedDate, date,
        'deepcopy(Date) should be return Date');
    assert.deepEqual(deepCopiedRegExp, regexp,
        'deepcopy(RegExp) should be return RegExp');
  });

  test('RegExpが正常に生成できていること', function() {
    assert.deepEqual(new RegExp('', ''), deepcopy(new RegExp('', ''),
        'deepcopy(RegExp) should be return RegExp'));
    assert.deepEqual(new RegExp('a', ''), deepcopy(new RegExp('a', ''),
        'deepcopy(RegExp) should be return RegExp'));
    assert.deepEqual(new RegExp('', 'i'), deepcopy(new RegExp('', 'i'),
        'deepcopy(RegExp) should be return RegExp'));
    assert.deepEqual(new RegExp('!', 'ig'), deepcopy(new RegExp('!', 'ig'),
        'deepcopy(RegExp) should be return RegExp'));
  });

  suite('ObjectとArrayのディープコピーに関するテスト', function() {

    test('Objectのコピーができること', function() {
      var obj = {
        num: 123,
        str: 'a',
        bool: true,
        nil: null,
        undef: void 0,
        now: new Date,
        reg: /node/ig
      },
          copiedObj = deepcopy(obj);

      assert.notStrictEqual(copiedObj, obj,
          'copied value (Object) is not equal instance of target.');
      assert.deepEqual(copiedObj, obj,
          'deepcopy(Object) should be return RegExp');
    });

    test('Arrayのコピーができること', function() {
      var arr = [
        321,
        'b',
        false,
        null,
        void 0,
        new Date,
        /node/ig
      ],
          copiedArr = deepcopy(arr);

      assert.notStrictEqual(copiedArr, arr,
          'copied value (Array) is not equal instance of target.');
      assert.deepEqual(copiedArr, arr,
          'deepcopy(Array) should be return RegExp');
    });

    test('ObjectとArrayがコピーできること', function() {
      var obj = {
        arr: [
          {a: [1, 2, 3], b: ['a', 'b', 'c'], c: [true, false, null, void 0]},
          {a: [1, 2, 3], b: ['a', 'b', 'c'], c: [true, false, null, void 0]},
          {a: [1, 2, 3], b: ['a', 'b', 'c'], c: [true, false, null, void 0]}
        ],
        obj: {
          a: [{a: 573}, {b: 'b'}, {c: false}],
          b: [{a: 573}, {b: 'b'}, {c: false}],
          c: [{a: 573}, {b: 'b'}, {c: false}]
        }
      },
          copiedObj = deepcopy(obj);

      assert.notStrictEqual(copiedObj, obj,
          'copied value (Object) is not equal instance of target.');
      assert.deepEqual(copiedObj, obj,
          'deepcopy(Object) should be return RegExp');
    });

    test('循環参照でRangeErrorが投げられること', function() {
      assert.throws(function() {
        var a = {},
            b = {};

        a.to = b;
        b.to = a;

        return deepcopy(a);
      }, RangeError);
    });

  });

});
