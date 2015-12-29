import assert from 'power-assert';
import deepcopy from '../src';

describe('deepcopy', function() {

  const hasSymbol = (typeof Symbol === 'function');

  it('throw error if customizer is not a Function', function() {
    assert.throws(() => deepcopy([], null));
    assert.throws(() => deepcopy({}, null));
  });

  it('can copy some basic primitive types', function() {
    // String
    assert(deepcopy('') === '');
    assert(deepcopy('string') === 'string');

    // Number
    assert(deepcopy(0) === 0);
    assert(deepcopy(9007199254740991) === 9007199254740991);
    assert(deepcopy(-9007199254740991) === -9007199254740991);
    assert(deepcopy(Infinity) === Infinity);
    assert(deepcopy(-Infinity) === -Infinity);
    assert(isNaN(deepcopy(NaN)));

    // Boolean
    assert(deepcopy(true) === true);
    assert(deepcopy(false) === false);

    // null
    assert(deepcopy(null) === null);

    // undefined
    assert(deepcopy(void 0) === void 0);
  });

  it('can copy Symbol', hasSymbol && function() {
    const symbol = Symbol();

    assert(deepcopy(symbol) === symbol);
  });

  it('can copy Date', function() {
    const date = new Date();

    const copiedDate = deepcopy(date);

    assert(copiedDate !== date);
    assert(+copiedDate === +date);
  });

  it('can copy RegExp', function() {
    const regexp = new RegExp('', 'ig');

    const copiedRegExp = deepcopy(regexp);

    assert(copiedRegExp !== regexp);
    assert(String(copiedRegExp) === String(regexp));
  });

  it('can copy Array', function() {
    const array = [1, 2, 3];

    const copiedArray = deepcopy(array);

    assert(copiedArray !== array);
    assert(copiedArray[0] === array[0]);
    assert(copiedArray[1] === array[1]);
    assert(copiedArray[2] === array[2]);
  });

  it('can copy Object', function() {
    const object = { a: 1, b: 2, c: 3 };

    const copiedObject = deepcopy(object);

    assert(copiedObject !== object);
    assert(copiedObject.a === object.a);
    assert(copiedObject.b === object.b);
    assert(copiedObject.c === object.c);
  });

  it('can copy Function', function() {
    const fn = function() {
      return 192455631;
    };

    const result = deepcopy(fn);

    assert(result !== fn);
    assert(String(result) === String(fn));
    assert(result() === 192455631);
  });

  it('can shallow copy native function', function() {
    const result = deepcopy(Math.abs);

    assert(result === Math.abs);
  });

  it('can recursively copy from Array', function() {
    const array = [
      [[1], [2], [3]],
      [[4], [5], [6]],
      [[7], [8], [9]],
    ];

    const result = deepcopy(array);

    assert(result !== array);
    assert(result[0] !== array[0]);
    assert(result[0][0] !== array[0][0]);
    assert(result[0][0][0] === array[0][0][0]);

    array[0][0][0] = 10;

    assert(result[0][0][0] !== array[0][0][0]);
  });

  it('can recursively copy from Object', function() {
    const object = {
      a: { a: { a: true }, b: { b: false }, c: { c: null } },
      b: { a: { a: true }, b: { b: false }, c: { c: null } },
      c: { a: { a: true }, b: { b: false }, c: { c: null } },
    };

    const result = deepcopy(object);

    assert(result !== object);
    assert(result.a !== object.a);
    assert(result.a.a !== object.a.a);
    assert(result.a.a.a === object.a.a.a);

    object.a.a.a = 10;

    assert(result.a.a.a !== object.a.a.a);
  });

  it('can recursively copy from Object, it has Symbol', hasSymbol && function() {
    const a = Symbol('a'),
          b = Symbol('b'),
          c = Symbol('c');

    const symbolObject = {
      [a]: 1,
      [b]: 2,
      [c]: 3,
    };

    const result = deepcopy(symbolObject);

    assert(result !== symbolObject);
    assert(result[a] === symbolObject[a]);
    assert(result[b] === symbolObject[b]);
    assert(result[c] === symbolObject[c]);

    symbolObject[a] = 10;

    assert(result[a] !== symbolObject[a]);
  });

  it('can recursively copy from Function as Object', function() {
    const fn = function() {};

    fn.a = { a: { a: true }, b: { b: false }, c: { c: null } };
    fn.b = { a: { a: true }, b: { b: false }, c: { c: null } };
    fn.c = { a: { a: true }, b: { b: false }, c: { c: null } };

    const result = deepcopy(fn);

    assert(result !== fn);
    assert(result.a !== fn.a);
    assert(result.a.a !== fn.a.a);
    assert(result.a.a.a === fn.a.a.a);

    fn.a.a.a = 10;

    assert(result.a.a.a !== fn.a.a.a);
  });

  it('can recursively copy from Function as Object, it has Symbol', hasSymbol && function() {
    const fn = function() {};

    const a = Symbol('a'),
          b = Symbol('b'),
          c = Symbol('c');

    fn[a] = { [a]: { [a]: true }, [b]: { [b]: false }, [c]: { [c]: null } };
    fn[b] = { [a]: { [a]: true }, [b]: { [b]: false }, [c]: { [c]: null } };
    fn[c] = { [a]: { [a]: true }, [b]: { [b]: false }, [c]: { [c]: null } };

    const result = deepcopy(fn);

    assert(result !== fn);
    assert(result[a] !== fn[a]);
    assert(result[a][a] !== fn[a][a]);
    assert(result[a][a][a] === fn[a][a][a]);

    fn[a][a][a] = 10;

    assert(result[a][a][a] !== fn[a][a][a]);
  });

  it('can copy duplicate Function', function() {
    const fn = function() {};

    const array = [fn, fn],
          copiedArray = deepcopy(array);

    assert(array !== copiedArray);
    assert(array[0] !== copiedArray[0]);
    assert(array[1] !== copiedArray[1]);

    assert(copiedArray[0] === copiedArray[1]);

    const object = { a: fn, b: fn },
          copiedObject = deepcopy(object);

    assert(object !== copiedObject);
    assert(object.a !== copiedObject.a);
    assert(object.b !== copiedObject.b);

    assert(copiedObject.a === copiedObject.b);
  });

  it('can copy duplicate Function, it has Symbol', hasSymbol && function() {
    const fn = function() {};

    const a = Symbol('a'),
          b = Symbol('b');

    const symbolObject = {
      [a]: fn,
      [b]: fn,
    };
    const copiedSymbolObject = deepcopy(symbolObject);

    assert(symbolObject !== copiedSymbolObject);
    assert(symbolObject[a] !== copiedSymbolObject[a]);
    assert(symbolObject[b] !== copiedSymbolObject[b]);

    assert(copiedSymbolObject[a] === copiedSymbolObject[b]);
  });

  it('can copy duplicate Date', function() {
    const date = new Date();

    const array = [date, date],
          copiedArray = deepcopy(array);

    assert(array !== copiedArray);
    assert(array[0] !== copiedArray[0]);
    assert(array[1] !== copiedArray[1]);

    assert(+array[0] === +copiedArray[0]);
    assert(+array[1] === +copiedArray[1]);

    assert(copiedArray[0] === copiedArray[1]);
    assert(+copiedArray[0] === +copiedArray[1]);

    const object = { a: date, b: date },
          copiedObject = deepcopy(object);

    assert(object !== copiedObject);
    assert(object.a !== copiedObject.a);
    assert(object.b !== copiedObject.b);

    assert(+object.a === +copiedObject.a);
    assert(+object.b === +copiedObject.b);

    assert(copiedObject.a === copiedObject.b);
    assert(+copiedObject.a === +copiedObject.b);
  });

  it('can copy duplicate Date, it has Symbol', hasSymbol && function() {
    const date = new Date();

    const a = Symbol('a'),
          b = Symbol('b');

    const symbolObject = {
      [a]: date,
      [b]: date,
    };
    const copiedSymbolObject = deepcopy(symbolObject);

    assert(symbolObject !== copiedSymbolObject);
    assert(symbolObject[a] !== copiedSymbolObject[a]);
    assert(symbolObject[b] !== copiedSymbolObject[b]);

    assert(+symbolObject[a] === +copiedSymbolObject[a]);
    assert(+symbolObject[b] === +copiedSymbolObject[b]);

    assert(copiedSymbolObject[a] === copiedSymbolObject[b]);
    assert(+copiedSymbolObject[a] === +copiedSymbolObject[b]);
  });

  it('can copy Class from Array and Object by customizer', function() {
    function MyClass(number) {
      this.number = +number;
    }

    const customizer = function(target) {
      if (target.constructor === MyClass) {
        return new MyClass(target.number);
      }
    };

    const myClass = new MyClass(10);

    const array = [myClass, myClass],
          copiedArray = deepcopy(array, customizer);

    assert(array[0] !== copiedArray[0]);
    assert(array[1] !== copiedArray[1]);
    assert(array[0].number === copiedArray[0].number);
    assert(array[1].number === copiedArray[1].number);

    assert(copiedArray[0] === copiedArray[1]);
    assert(copiedArray[0].number === copiedArray[1].number);

    const object = { a: myClass, b: myClass },
          copiedObject = deepcopy(object, customizer);

    assert(object.a !== copiedObject.a);
    assert(object.b !== copiedObject.b);
    assert(object.a.number === copiedObject.a.number);
    assert(object.b.number === copiedObject.b.number);

    assert(copiedObject.a === copiedObject.b);
    assert(copiedObject.a.number === copiedObject.b.number);
  });

  it('can copy Class from Object by customizer, it has Symbol', hasSymbol && function() {
    function MyClass(number) {
      this.number = +number;
    }

    const customizer = function(target) {
      if (target.constructor === MyClass) {
        return new MyClass(target.number);
      }
    };

    const myClass = new MyClass(10);

    const a = Symbol('a'),
          b = Symbol('b');

    const object = { [a]: myClass, [b]: myClass },
          copiedObject = deepcopy(object, customizer);

    assert(object[a] !== copiedObject[a]);
    assert(object[b] !== copiedObject[b]);
    assert(object[a].number === copiedObject[a].number);
    assert(object[b].number === copiedObject[b].number);

    assert(copiedObject[a] === copiedObject[b]);
    assert(copiedObject[a].number === copiedObject[b].number);
  });

});
