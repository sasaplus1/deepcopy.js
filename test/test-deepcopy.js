var expect, deepcopy;

if (typeof module !== 'undefined') {
  expect = require('expect.js');
  deepcopy = require('../');
} else {
  expect = this.expect;
  deepcopy = this.deepcopy;
}

describe('deepcopy', function() {

  it('should return deep copy if parameter is primitive type', function() {
    expect(deepcopy(12345)).to.be(12345);
    expect(deepcopy('abc')).to.be('abc');
    expect(deepcopy(true)).to.be(true);
    expect(deepcopy(null)).to.be(null);
    expect(deepcopy(void 0)).to.be(void 0);
  });

  it('should return reference if parameter is Function', function() {
    function f() {}

    expect(deepcopy(f)).to.be(f);
  });

  it('should return deep copy if parameter is Date', function() {
    var date = new Date;

    expect(deepcopy(date)).to.eql(date);
  });

  it('should return deep copy if parameter is RegExp', function() {
    var regexp = /\x00/gi;

    expect(deepcopy(regexp)).to.eql(regexp);
  });

  it('should return deep copy if parameter is Array', function() {
    var array = [
      12345, 'abc', true, null, void 0, function() {}, new Date, /\x00/gi, [
        12345, 'abc', true, null, void 0, function() {}, new Date, /\x00/gi
      ], {
        array: [
          12345, 'abc', true, null, void 0, function() {}, new Date, /\x00/gi
        ]
      }
    ];

    expect(deepcopy(array)).to.eql(array);
  });

  it('should return deep copy if parameter is Object', function() {
    var object = {
      num: 12345,
      str: 'abc',
      bool: true,
      null: null,
      undefined: void 0,
      fn: function() {},
      date: new Date,
      regexp: /\x00/gi,
      array: [
        1, 'a', false, null, void 0, function() {}, new Date, /\x00/gi
      ],
      object: {
        num: 1,
        str: 'a',
        bool: false,
        null: null,
        undefined: void 0,
        fn: function() {},
        date: new Date,
        regexp: /\x00/gi
      }
    };

    expect(deepcopy(object)).to.eql(object);
  });

  it('should return deep copy if parameter has circular reference', function() {
    var circular, copy;

    expect(function() {
      circular = {};
      circular.to = circular;
      copy = deepcopy(circular);
    }).to.not.throwException();

    expect(copy.to).to.be(copy);
  });

  it('should return deep copy if parameter has copied functions in the same' +
      ' object', function() {
        var func = function() {};
        var object = {
          a: func,
          b: func
        };
        var cloned = deepcopy(object);

        expect(cloned.a).to.be(cloned.b);
      });

  it('should return deep copy if parameter has copied functions in the same' +
      ' array', function() {
        var func = function() {};
        var array = [func, func];
        var cloned = deepcopy(array);

        expect(cloned[0]).to.be(cloned[1]);
      });

});
