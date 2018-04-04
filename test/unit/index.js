import assert from 'assert';
import deepcopy from '../../';

describe('deepcopy', function() {
  it('can copy primitive values', function() {
    assert(deepcopy('') === '');

    assert(deepcopy(0) === 0);
    assert(deepcopy(Number.MAX_SAFE_INTEGER) === Number.MAX_SAFE_INTEGER);
    assert(deepcopy(Number.MIN_SAFE_INTEGER) === Number.MIN_SAFE_INTEGER);
    assert(deepcopy(Number.POSITIVE_INFINITY) === Number.POSITIVE_INFINITY);
    assert(deepcopy(Number.NEGATIVE_INFINITY) === Number.NEGATIVE_INFINITY);
    assert(Number.isNaN(deepcopy(NaN)));

    assert(deepcopy(true) === true);
    assert(deepcopy(false) === false);

    assert(deepcopy(null) === null);
    assert(deepcopy(undefined) === undefined);
  });

  it('can copy symbol', function() {
    const symbol = Symbol();

    assert(deepcopy(symbol) === symbol);
  });
});
