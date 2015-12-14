import assert from 'power-assert';
import deepcopy from '../';

describe('deepcopy', function() {

  const hasSymbol = (typeof Symbol === 'function');

  it('can copy some basic primitive types', function() {
    // string
    assert(deepcopy('') === '');
    assert(deepcopy('string') === 'string');

    // number
    assert(deepcopy(0) === 0);
    assert(deepcopy(192455631) === 192455631);
    assert(deepcopy(Infinity) === Infinity);
    assert(deepcopy(-Infinity) === -Infinity);
    assert(isNaN(deepcopy(NaN)));

    // boolean
    assert(deepcopy(true) === true);
    assert(deepcopy(false) === false);

    // null
    assert(deepcopy(null) === null);

    // undefined
    assert(deepcopy(void 0) === void 0);
  });

  it('can copy symbol', hasSymbol && function() {
    const symbol = Symbol();

    assert(deepcopy(symbol) === symbol);
  });

  it('can copy some built-in classes', function() {
    const date = new Date();

    assert(+deepcopy(date) === +date);

    const regexp = new RegExp('', 'ig');

    assert(String(deepcopy(regexp)) === String(regexp));

    const array = [1, 2, 3];

    assert(JSON.stringify(deepcopy(array)) === JSON.stringify(array));

    const object = { a: 1, b: 2, c: 3 };

    assert(JSON.stringify(deepcopy(object)) === JSON.stringify(object));
  });

  it('can recursively copy from Array', function() {
    const array = [
      [[1], [2], [3]],
      [[4], [5], [6]],
      [[7], [8], [9]],
    ];

    const result = deepcopy(array);

    assert.deepEqual(result, array);

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

    assert.deepEqual(result, object);

    object.a.a.a = void 0;

    assert(result.a.a.a !== object.a.a.a);
  });

  it('can recursively copy from Function as Object', function() {
    const fn = function() {};

    fn.a = { a: { a: true }, b: { b: false }, c: { c: null } };
    fn.b = { a: { a: true }, b: { b: false }, c: { c: null } };
    fn.c = { a: { a: true }, b: { b: false }, c: { c: null } };

    const result = deepcopy(fn);

    assert.deepEqual(result, fn);

    fn.a.a.a = void 0;

    assert(result.a.a.a !== fn.a.a.a);
  });

  it('can recursively copy from Object, it has Symbol', hasSymbol && function() {
    const symbolObject = {
      [Symbol.for('a')]: 1,
      [Symbol.for('b')]: 2,
      [Symbol.for('c')]: 3,
    };

    const result = deepcopy(symbolObject);

    assert(result[Symbol.for('a')] === symbolObject[Symbol.for('a')]);
    assert(result[Symbol.for('b')] === symbolObject[Symbol.for('b')]);
    assert(result[Symbol.for('c')] === symbolObject[Symbol.for('c')]);

    symbolObject[Symbol.for('a')] = 10;

    assert(result[Symbol.for('a')] !== symbolObject[Symbol.for('a')]);
  });

  it('can copy duplicated Function', function() {
    const fn = function() {};

    const array = [fn, fn],
          copiedArray = deepcopy(array);

    assert(copiedArray[0] === copiedArray[1]);

    const object = { a: fn, b: fn },
          copiedObject = deepcopy(object);

    assert(copiedObject.a === copiedObject.b);

    const symbolObject = {
      [Symbol.for('a')]: fn,
      [Symbol.for('b')]: fn,
    };
    const copiedSymbolObject = deepcopy(symbolObject);

    assert(copiedSymbolObject[Symbol.for('a')] ===
           copiedSymbolObject[Symbol.for('b')]);
  });

  it('can copy duplicated Date', function() {
    const date = new Date();

    const array = [date, date],
          copiedArray = deepcopy(array);

    assert(+copiedArray[0] === +copiedArray[1]);

    const object = { a: date, b: date },
          copiedObject = deepcopy(object);

    assert(+copiedObject.a === +copiedObject.b);

    const symbolObject = {
      [Symbol.for('a')]: date,
      [Symbol.for('b')]: date,
    };
    const copiedSymbolObject = deepcopy(symbolObject);

    assert(+copiedSymbolObject[Symbol.for('a')] ===
           +copiedSymbolObject[Symbol.for('b')]);
  });

});
