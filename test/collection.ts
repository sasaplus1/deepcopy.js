import assert = require('assert');

import { isCollection, getKeys, getValue, setValue } from '../src/collection';
import { detectType } from '../src/detector';

const supportsSymbol =
  typeof Symbol === 'function' && typeof Symbol() === 'symbol';

describe('collection', function () {
  describe('isCollection', function () {
    it('should return true if value is a collection', function () {
      assert(isCollection('Arguments'));
      assert(isCollection('Array'));
      assert(isCollection('Map'));
      assert(isCollection('Object'));
      assert(isCollection('Set'));
    });
    it('should return false if value is not a collection', function () {
      assert(!isCollection('WeakMap'));
      assert(!isCollection('WeakSet'));
      assert(!isCollection('Float32Array'));
      assert(!isCollection('Float64Array'));
      assert(!isCollection('Int16Array'));
      assert(!isCollection('Int32Array'));
      assert(!isCollection('Int8Array'));
      assert(!isCollection('Uint16Array'));
      assert(!isCollection('Uint32Array'));
      assert(!isCollection('Uint8Array'));
      assert(!isCollection('Uint8ClampedArray'));
    });
  });
  describe('getKeys', function () {
    it('should get keys from Array', function () {
      const value = [1, 2, 3];

      assert.deepStrictEqual(getKeys(value, detectType(value)), [
        '0',
        '1',
        '2'
      ]);
    });
    it('should get keys from Object', function () {
      const value = { '0': 1, '1': 2, '2': 3 };

      assert.deepStrictEqual(getKeys(value, detectType(value)), [
        '0',
        '1',
        '2'
      ]);
    });
    it('should get symbols from Object', function () {
      if (!supportsSymbol) {
        this.skip();
      }

      const sym1 = Symbol();
      const sym2 = Symbol();
      const sym3 = Symbol();

      const value = {
        [sym1]: 1,
        [sym2]: 2,
        [sym3]: 3
      };

      assert.deepStrictEqual(getKeys(value, detectType(value)), [
        sym1,
        sym2,
        sym3
      ]);
    });
    it('should get keys from Map', function () {
      const value = new Map<number, number>([
        [0, 1],
        [1, 2],
        [2, 3]
      ]);

      assert.deepStrictEqual(getKeys(value, detectType(value)), [0, 1, 2]);
    });
    it('should get keys from Set', function () {
      const value = new Set<number>([1, 2, 3]);

      assert.deepStrictEqual(getKeys(value, detectType(value)), [1, 2, 3]);
    });
  });
  describe('getValue', function () {
    it('should get value from Array', function () {
      const value = [1, 2, 3];

      assert(getValue(value, 0, detectType(value)) === 1);
      assert(getValue(value, 1, detectType(value)) === 2);
      assert(getValue(value, 2, detectType(value)) === 3);
    });
    it('should get value from Map', function () {
      const value = new Map<number, number>([
        [0, 1],
        [1, 2],
        [2, 3]
      ]);

      assert(getValue(value, 0, detectType(value)) === 1);
      assert(getValue(value, 1, detectType(value)) === 2);
      assert(getValue(value, 2, detectType(value)) === 3);
    });
    it('should get value from Object', function () {
      const value = { '0': 1, '1': 2, '2': 3 };

      assert(getValue(value, '0', detectType(value)) === 1);
      assert(getValue(value, '1', detectType(value)) === 2);
      assert(getValue(value, '2', detectType(value)) === 3);
    });
    it('should get value from Set', function () {
      const value = new Set<number>([1, 2, 3]);

      assert(getValue(value, 1, detectType(value)) === 1);
      assert(getValue(value, 2, detectType(value)) === 2);
      assert(getValue(value, 3, detectType(value)) === 3);
    });
  });
  describe('setValue', function () {
    it('should set value to Array', function () {
      const value: number[] = [];

      setValue(value, 0, 1, detectType(value));
      setValue(value, 1, 2, detectType(value));
      setValue(value, 2, 3, detectType(value));

      assert.deepStrictEqual(value, [1, 2, 3]);
    });
    it('should set value to Map', function () {
      const value = new Map<number, number>();

      setValue(value, 0, 1, detectType(value));
      setValue(value, 1, 2, detectType(value));
      setValue(value, 2, 3, detectType(value));

      assert(value.get(0) === 1);
      assert(value.get(1) === 2);
      assert(value.get(2) === 3);
    });
    it('should set value to Object', function () {
      const value: Record<string, number> = {};

      setValue(value, '0', 1, detectType(value));
      setValue(value, '1', 2, detectType(value));
      setValue(value, '2', 3, detectType(value));

      assert.deepStrictEqual(value, { '0': 1, '1': 2, '2': 3 });
    });
    it('should set value to Set', function () {
      const value = new Set<number>();

      // setValue ignores key argument when value type is Set.
      setValue(value, null, 1, detectType(value));
      setValue(value, null, 2, detectType(value));
      setValue(value, null, 3, detectType(value));

      assert(value.has(1));
      assert(value.has(2));
      assert(value.has(3));
    });
  });
});
