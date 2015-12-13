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

    assert.deepEqual(deepcopy(array), array);
  });

  it('can recursively copy from Object', function() {
    const object = {
      a: { a: { a: true }, b: { b: false }, c: { c: null } },
      b: { a: { a: true }, b: { b: false }, c: { c: null } },
      c: { a: { a: true }, b: { b: false }, c: { c: null } },
    };

    assert.deepEqual(deepcopy(object), object);
  });

  it('can recursively copy from Object, it has Symbol', hasSymbol && function() {
    const symbolObject = {
      [Symbol.for('a')]: 1,
      [Symbol.for('b')]: 2,
      [Symbol.for('c')]: 3,
    };

    const copiedObject = deepcopy(symbolObject);

    assert(copiedObject[Symbol.for('a')] === symbolObject[Symbol.for('a')]);
    assert(copiedObject[Symbol.for('b')] === symbolObject[Symbol.for('b')]);
    assert(copiedObject[Symbol.for('c')] === symbolObject[Symbol.for('c')]);
  });

  it('can copy duplicated function', function() {
    const fn = function() {};

    const array = [fn, fn],
          copiedArray = deepcopy(array);

    assert(copiedArray[0] === copiedArray[1]);

    const object = { a: fn, b: fn },
          copiedObject = deepcopy(object);

    assert(copiedObject[0] === copiedObject[1]);

    const symbolObject = {
      [Symbol.for('a')]: fn,
      [Symbol.for('b')]: fn,
    };
    const copiedSymbolObject = deepcopy(symbolObject);

    assert(copiedSymbolObject[Symbol.for('a')] ===
           copiedSymbolObject[Symbol.for('b')]);
  });

});
