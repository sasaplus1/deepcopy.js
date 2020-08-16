import assert = require('assert');

import { clone, copy } from '../src/clone';
import { detectType } from '../src/detector';

const supportsSymbol =
  typeof Symbol === 'function' && typeof Symbol() === 'symbol';

describe('clone', function () {
  describe('clone', function () {
    describe('should return deep copied value', function () {
      it('ArrayBuffer', function () {
        if (
          typeof ArrayBuffer === 'undefined' ||
          typeof Uint8Array === 'undefined'
        ) {
          return this.skip();
        }

        const data = new ArrayBuffer(3);
        const result = clone(data, detectType(data)) as ArrayBuffer;

        assert(result instanceof ArrayBuffer);
        assert(result !== data);

        const a = new Uint8Array(data);
        const b = new Uint8Array(result);

        b[0] = 1;
        b[1] = 2;
        b[2] = 3;

        a[0] = 4;
        a[1] = 5;
        a[2] = 6;

        assert(b[0] === 1);
        assert(b[1] === 2);
        assert(b[2] === 3);
      });
      it('Boolean', function () {
        const data = new Boolean(false);
        // eslint-disable-next-line @typescript-eslint/ban-types
        const result = clone(data, detectType(data)) as Boolean;

        assert(result instanceof Boolean);
        assert(result !== data);
        assert(data.valueOf() === result.valueOf());
      });
      it('Buffer', function () {
        if (typeof Buffer === 'undefined') {
          return this.skip();
        }

        const data = Buffer.from([0xe5, 0xaf, 0xbf, 0xe5, 0x8f, 0xb8]);
        const result = clone(data, detectType(data)) as Buffer;

        assert(result instanceof Buffer);
        assert(result !== data);
        assert(data.toString('utf8') === result.toString('utf8'));

        data[0] = 0xe5;
        data[1] = 0xae;
        data[2] = 0xae;

        assert(data.toString('utf8') !== result.toString('utf8'));
      });
      it('DataView', function () {
        if (
          typeof DataView === 'undefined' ||
          typeof ArrayBuffer === 'undefined'
        ) {
          return this.skip();
        }

        const data = new DataView(new ArrayBuffer(5));
        const result = clone(data, detectType(data)) as DataView;

        assert(result instanceof DataView);
        assert(result !== data);
      });
      it('Date', function () {
        const data = new Date();
        const result = clone(data, detectType(data)) as Date;

        assert(result instanceof Date);
        assert(result !== data);
        assert(data.getTime() === result.getTime());
      });
      it('Number', function () {
        const data = new Number(65535);
        // eslint-disable-next-line @typescript-eslint/ban-types
        const result = clone(data, detectType(data)) as Number;

        assert(result instanceof Number);
        assert(result !== data);
        assert(data.valueOf() === result.valueOf());
      });
      it('RegExp', function () {
        const data = new RegExp('', 'i');
        const result = clone(data, detectType(data)) as RegExp;

        assert(result instanceof RegExp);
        assert(result !== data);
        assert(result.source === data.source);
        assert(result.flags === data.flags);
      });
      it('String', function () {
        const data = new String('Hello!');
        // eslint-disable-next-line @typescript-eslint/ban-types
        const result = clone(data, detectType(data)) as String;

        assert(result instanceof String);
        assert(result !== data);
        assert(data.valueOf() === result.valueOf());
      });
      it('Float32Array', function () {
        if (typeof Float32Array === 'undefined') {
          return this.skip();
        }

        const data = new Float32Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Float32Array;

        assert(result instanceof Float32Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Float64Array', function () {
        if (typeof Float64Array === 'undefined') {
          return this.skip();
        }

        const data = new Float64Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Float64Array;

        assert(result instanceof Float64Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Int16Array', function () {
        if (typeof Int16Array === 'undefined') {
          return this.skip();
        }

        const data = new Int16Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Int16Array;

        assert(result instanceof Int16Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });

      it('Int32Array', function () {
        if (typeof Int32Array === 'undefined') {
          return this.skip();
        }

        const data = new Int32Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Int32Array;

        assert(result instanceof Int32Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Int8Array', function () {
        if (typeof Int8Array === 'undefined') {
          return this.skip();
        }

        const data = new Int8Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Int8Array;

        assert(result instanceof Int8Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Uint16Array', function () {
        if (typeof Uint16Array === 'undefined') {
          return this.skip();
        }

        const data = new Uint16Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Uint16Array;

        assert(result instanceof Uint16Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Uint32Array', function () {
        if (typeof Uint32Array === 'undefined') {
          return this.skip();
        }

        const data = new Uint32Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Uint32Array;

        assert(result instanceof Uint32Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Uint8Array', function () {
        if (typeof Uint8Array === 'undefined') {
          return this.skip();
        }

        const data = new Uint8Array([1, 2, 3]);
        const result = clone(data, detectType(data)) as Uint8Array;

        assert(result instanceof Uint8Array);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
      it('Uint8ClampedArray', function () {
        if (typeof Uint8ClampedArray === 'undefined') {
          return this.skip();
        }

        const data = new Uint8ClampedArray([1, 2, 3]);
        const result = clone(data, detectType(data)) as Uint8ClampedArray;

        assert(result instanceof Uint8ClampedArray);
        assert(result !== data);

        data[0] = 4;
        data[1] = 5;
        data[2] = 6;

        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      });
    });
    describe('should return shallow copied value', function () {
      it('Array Iterator', function () {
        if (!supportsSymbol) {
          return this.skip();
        }

        const data = [1, 2, 3][Symbol.iterator]();
        const result = clone(data, detectType(data)) as IterableIterator<
          number
        >;

        assert(result === data);
      });
      it('Map Iterator', function () {
        if (!supportsSymbol) {
          return this.skip();
        }

        const data = new Map<number, number>([
          [0, 1],
          [1, 2],
          [2, 3]
        ])[Symbol.iterator]();
        const result = clone(data, detectType(data)) as IterableIterator<
          [number, number]
        >;

        assert(result === data);
      });
      it('Promise', function () {
        const data = new Promise<number>(function (resolve): void {
          return resolve(1);
        });
        const result = clone(data, detectType(data)) as Promise<number>;

        assert(result === data);
      });
      it('Set Iterator', function () {
        if (!supportsSymbol) {
          return this.skip();
        }

        const data = new Set<number>([1, 2, 3])[Symbol.iterator]();
        const result = clone(data, detectType(data)) as IterableIterator<
          number
        >;

        assert(result === data);
      });
      it('String Iterator', function () {
        if (!supportsSymbol) {
          return this.skip();
        }

        const data = '寿司'[Symbol.iterator]();
        const result = clone(data, detectType(data)) as IterableIterator<
          string
        >;

        assert(result === data);
      });
      it('function', function () {
        const data = function (): void {
          return;
        };
        const result = clone(data, detectType(data)) as () => void;

        assert(result === data);
      });
      it('global', function () {
        if (typeof globalThis !== 'undefined') {
          assert(globalThis === clone(globalThis, detectType(globalThis)));
        } else if (typeof self !== 'undefined') {
          assert(self === clone(self, detectType(self)));
        } else if (typeof global !== 'undefined') {
          assert(global === clone(global, detectType(global)));
        } else {
          assert(false);
        }
      });
      it('WeakMap', function () {
        const data = new WeakMap<object, unknown>();
        const result = clone(data, detectType(data)) as WeakMap<
          object,
          unknown
        >;

        assert(result === data);
      });
      it('WeakSet', function () {
        const data = new WeakSet<object>();
        const result = clone(data, detectType(data)) as WeakSet<object>;

        assert(result === data);
      });
      it('boolean', function () {
        assert(clone(true, detectType(true)) === true);
        assert(clone(false, detectType(false)) === false);
      });
      it('null', function () {
        assert(clone(null, detectType(null)) === null);
      });
      it('number', function () {
        assert(clone(0, detectType(0)) === 0);
        assert(
          clone(
            Number.MAX_SAFE_INTEGER,
            detectType(Number.MAX_SAFE_INTEGER)
          ) === Number.MAX_SAFE_INTEGER
        );
        assert(
          clone(
            Number.MIN_SAFE_INTEGER,
            detectType(Number.MIN_SAFE_INTEGER)
          ) === Number.MIN_SAFE_INTEGER
        );
        assert(
          clone(
            Number.POSITIVE_INFINITY,
            detectType(Number.POSITIVE_INFINITY)
          ) === Number.POSITIVE_INFINITY
        );
        assert(
          clone(
            Number.NEGATIVE_INFINITY,
            detectType(Number.NEGATIVE_INFINITY)
          ) === Number.NEGATIVE_INFINITY
        );
        assert(Number.isNaN(clone(NaN, detectType(NaN)) as number));
      });
      it('string', function () {
        assert(clone('寿司', detectType('寿司')) === '寿司');
      });
      it('symbol', function () {
        if (!supportsSymbol) {
          return this.skip();
        }

        const data = Symbol();
        const result = clone(data, detectType(data)) as symbol;

        assert(result === data);
      });
      it('undefined', function () {
        assert(clone(undefined, detectType(undefined)) === undefined);
      });
    });
    describe('should return empty collection', function () {
      it('Arguments', function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (function (one: number, two: number, three: number): void {
          // eslint-disable-next-line prefer-rest-params
          const result = clone(arguments, detectType(arguments)) as Array<
            number
          >;

          assert(Array.isArray(result));
          assert(result.length === 0);
        })(1, 2, 3);
      });
      it('Array', function () {
        const data = [1, 2, 3];
        const result = clone(data, detectType(data)) as Array<number>;

        assert(Array.isArray(result));
        assert(result.length === 0);
      });
      it('Map', function () {
        const data = new Map<number, number>([
          [0, 1],
          [1, 2],
          [2, 3]
        ]);
        const result = clone(data, detectType(data)) as Map<number, number>;

        assert(result instanceof Map);
        assert(result.size === 0);
      });
      it('Object', function () {
        const data = { a: 1, b: 2, c: 3 };
        const result = clone(data, detectType(data)) as Record<string, number>;

        assert(result instanceof Object);
        assert(Object.keys(result).length === 0);
      });
      it('Set', function () {
        const data = new Set<number>([1, 2, 3]);
        const result = clone(data, detectType(data)) as Set<number>;

        assert(result instanceof Set);
        assert(result.size === 0);
      });
    });
  });
  describe('copy', function () {
    it('should return customized value', function () {
      class A {
        isA(): void {
          console.log('Hello!');
        }
      }

      const data = new A();

      function customizer(value: unknown): A | undefined {
        if (value instanceof A) {
          return new A();
        }
      }

      const result = copy(data, detectType(data), customizer) as A;

      assert(result !== data);
      assert(result instanceof A);
      assert(typeof result.isA === 'function');
    });
  });
});
