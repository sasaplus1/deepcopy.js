describe('deepcopy', function() {
  const freeGlobalThis =
    typeof globalThis !== 'undefined' &&
    globalThis !== null &&
    globalThis.Object === Object &&
    globalThis;

  const freeGlobal =
    typeof global !== 'undefined' &&
    global !== null &&
    global.Object === Object &&
    global;

  const freeSelf =
    typeof self !== 'undefined' &&
    self !== null &&
    self.Object === Object &&
    self;

  const globalObject =
    freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

  describe('testing info', function() {
    it('global object is ' + globalObject);
  });

  describe('deep copy targets', function() {
    it('can copy ArrayBuffer', function() {
      if (
        typeof ArrayBuffer === 'undefined' ||
        typeof Uint8Array === 'undefined'
      ) {
        return this.skip();
      }

      const data = new ArrayBuffer(3);
      const result = deepcopy(data);

      assert(result instanceof ArrayBuffer);
      assert(data !== result);

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

    it('can copy boolean', function() {
      assert(deepcopy(true) === true);
      assert(deepcopy(false) === false);
    });

    it('can copy Boolean', function() {
      const data = new Boolean(false);
      const result = deepcopy(data);

      assert(result instanceof Boolean);
      assert(data !== result);
      assert(data.valueOf() === result.valueOf());
    });

    it('can copy Buffer', function() {
      if (typeof Buffer === 'undefined') {
        return this.skip();
      }

      const data = Buffer.from ? Buffer.from('buffer') : new Buffer('buffer');
      const result = deepcopy(data);

      assert(result instanceof Buffer);
      assert(data !== result);
      assert(data.toString('utf8') === result.toString('utf8'));

      data[0] = 97; // 'a'

      assert(data.toString('utf8') !== result.toString('utf8'));
    });

    it('can copy DataView', function() {
      if (
        typeof DataView === 'undefined' ||
        typeof ArrayBuffer === 'undefined'
      ) {
        return this.skip();
      }

      const data = new DataView(new ArrayBuffer(5));
      const result = deepcopy(data);

      assert(result instanceof DataView);
      assert(data !== result);
    });

    it('can copy Date', function() {
      const data = new Date();
      const result = deepcopy(data);

      assert(result instanceof Date);
      assert(data !== result);
      assert(data.getTime() === result.getTime());
    });

    it('can copy null', function() {
      assert(deepcopy(null) === null);
    });

    it('can copy number', function() {
      assert(deepcopy(0) === 0);
      assert(deepcopy(Number.MAX_SAFE_INTEGER) === Number.MAX_SAFE_INTEGER);
      assert(deepcopy(Number.MIN_SAFE_INTEGER) === Number.MIN_SAFE_INTEGER);
      assert(deepcopy(Number.POSITIVE_INFINITY) === Number.POSITIVE_INFINITY);
      assert(deepcopy(Number.NEGATIVE_INFINITY) === Number.NEGATIVE_INFINITY);
      assert(Number.isNaN(deepcopy(NaN)));
    });

    it('can copy Number', function() {
      const data = new Number(65535);
      const result = deepcopy(data);

      assert(result instanceof Number);
      assert(data !== result);
      assert(data.valueOf() === result.valueOf());
    });

    it('can copy RegExp', function() {
      const data = new RegExp('', 'i');
      const result = deepcopy(data);

      assert(result instanceof RegExp);
      assert(data !== result);
      assert(String(data) === String(result));
    });

    it('can copy string', function() {
      assert(deepcopy('Hello!') === 'Hello!');
    });

    it('can copy String', function() {
      const data = new String('Hello!');
      const result = deepcopy(data);

      assert(result instanceof String);
      assert(data !== result);
      assert(data.valueOf() === result.valueOf());
    });

    it('can copy symbol', function() {
      if (typeof Symbol === 'undefined') {
        return this.skip();
      }

      const data = Symbol();
      const result = deepcopy(data);

      assert(data === result);
    });

    it('can copy undefined', function() {
      assert(deepcopy(undefined) === undefined);
    });

    describe('TypedArrays', function() {
      [
        'Float32Array',
        'Float64Array',
        'Int16Array',
        'Int32Array',
        'Int8Array',
        'Uint16Array',
        'Uint32Array',
        'Uint8Array',
        'Uint8ClampedArray'
      ].forEach(function(typedArrayName) {
        it('can copy ' + typedArrayName, function() {
          if (typeof globalObject[typedArrayName] === 'undefined') {
            return this.skip();
          }

          const data = new globalObject[typedArrayName]([1, 2, 3]);
          const result = deepcopy(data);

          assert(result instanceof globalObject[typedArrayName]);
          assert(data !== result);

          data[0] = 4;
          data[1] = 5;
          data[2] = 6;

          assert(result[0] === 1);
          assert(result[1] === 2);
          assert(result[2] === 3);
        });
      });
    });
  });

  describe('shallow copy targets', function() {
    it('can shallow copy function', function() {
      const data = function() {};
      const result = deepcopy(data);

      assert(data === result);
    });

    it('can shallow copy global object', function() {
      const data = globalObject;
      const result = deepcopy(data);

      assert(data === result);
    });

    it('can shallow copy Promise', function() {
      const data = new Promise(function() {});
      const result = deepcopy(data);

      assert(data === result);
    });

    it('can shallow copy WeakMap', function() {
      const data = new WeakMap();
      const result = deepcopy(data);

      assert(data === result);
    });

    it('can shallow copy WeakSet', function() {
      const data = new WeakSet();
      const result = deepcopy(data);

      assert(data === result);
    });

    describe('Iterators', function() {
      ['Array', 'Map', 'Set', 'String'].forEach(function(
        IteratorBaseClassName
      ) {
        it(
          'can shallow copy ' + IteratorBaseClassName + ' Iterator',
          function() {
            if (
              typeof globalObject[IteratorBaseClassName] === 'undefined' ||
              typeof Symbol === 'undefined' ||
              typeof Symbol.iterator === 'undefined'
            ) {
              return this.skip();
            }

            const data = new globalObject[IteratorBaseClassName]()[
              Symbol.iterator
            ]();
            const result = deepcopy(data);

            assert(data === result);
          }
        );
      });
    });
  });

  describe('recursively copy', function() {
    it('can copy Arguments, it convert to an Array', function() {
      (function() {
        const data = arguments;
        const result = deepcopy(data);

        assert(data !== result);
        assert(Array.isArray(result));
        assert(result[0] === 1);
        assert(result[1] === 2);
        assert(result[2] === 3);
      })(1, 2, 3);
    });

    it('can copy Array', function() {
      const data = [1, 2, 3];
      const result = deepcopy(data);

      assert(data !== result);
      assert(result[0] === 1);
      assert(result[1] === 2);
      assert(result[2] === 3);
    });

    it('can copy Map', function() {
      if (typeof Map === 'undefined') {
        return this.skip();
      }

      const data = new Map([['a', 1], ['b', 2], ['c', 3]]);
      const result = deepcopy(data);

      assert(data !== result);

      data.clear();

      const iterator = result.entries();

      assert(iterator.next().value.join(',') === 'a,1');
      assert(iterator.next().value.join(',') === 'b,2');
      assert(iterator.next().value.join(',') === 'c,3');
    });

    it('can copy Object', function() {
      const data = { a: 1, b: 2, c: 3 };
      const result = deepcopy(data);

      assert(data !== result);
      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);
    });

    it('can copy Set', function() {
      if (typeof Set === 'undefined') {
        return this.skip();
      }

      const data = new Set([1, 2, 3]);
      const result = deepcopy(data);

      assert(data !== result);

      data.clear();

      assert(result.has(1));
      assert(result.has(2));
      assert(result.has(3));
    });

    describe('dive deep', function() {
      it('Array', function() {
        const result = deepcopy([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

        assert(result[0].join(',') === '1,2,3');
        assert(result[1].join(',') === '4,5,6');
        assert(result[2].join(',') === '7,8,9');
      });

      it('Object in Array', function() {
        const result = deepcopy([
          {
            a: 1,
            b: 2,
            c: 3
          },
          {
            a: 4,
            b: 5,
            c: 6
          }
        ]);

        assert(result[0].a === 1);
        assert(result[0].b === 2);
        assert(result[0].c === 3);
        assert(result[1].a === 4);
        assert(result[1].b === 5);
        assert(result[1].c === 6);
      });

      it('Object', function() {
        const result = deepcopy({
          a: { a: 1, b: 2, c: 3 },
          b: { d: 4, e: 5, f: 6 },
          c: { g: 7, h: 8, i: 9 }
        });

        assert(result.a.a === 1);
        assert(result.a.b === 2);
        assert(result.a.c === 3);
        assert(result.b.d === 4);
        assert(result.b.e === 5);
        assert(result.b.f === 6);
        assert(result.c.g === 7);
        assert(result.c.h === 8);
        assert(result.c.i === 9);
      });

      it('Symbol in Object', function() {
        const s1 = Symbol();
        const s2 = Symbol();
        const s3 = Symbol();

        const result = deepcopy({
          [s1]: [{ a: 1 }, { b: 2 }, { c: 3 }],
          [s2]: [{ a: 1 }, { b: 2 }, { c: 3 }],
          [s3]: [{ a: 1 }, { b: 2 }, { c: 3 }]
        });

        assert(result[s1][0].a === 1);
        assert(result[s1][1].b === 2);
        assert(result[s1][2].c === 3);
        assert(result[s2][0].a === 1);
        assert(result[s2][1].b === 2);
        assert(result[s2][2].c === 3);
        assert(result[s3][0].a === 1);
        assert(result[s3][1].b === 2);
        assert(result[s3][2].c === 3);
      });

      it('Object in Map', function() {
        const result = deepcopy(
          new Map([
            [1, { a: 1, b: 2, c: 3 }],
            [2, { a: 4, b: 5, c: 6 }],
            [3, { a: 7, b: 8, c: 9 }]
          ])
        );

        assert(result.get(1).a === 1);
        assert(result.get(1).b === 2);
        assert(result.get(1).c === 3);
        assert(result.get(2).a === 4);
        assert(result.get(2).b === 5);
        assert(result.get(2).c === 6);
        assert(result.get(3).a === 7);
        assert(result.get(3).b === 8);
        assert(result.get(3).c === 9);
      });
    });
  });

  describe('options', function() {
    describe('customizer', function() {
      it('can copy unknown class', function() {
        function A() {}

        const data = new A();
        const result = deepcopy(data, function(value) {
          if (value instanceof A) {
            return new A();
          }
        });

        assert(result instanceof A);
        assert(data !== result);
      });
    });
  });

  describe('issues', function() {
    it('#2', function() {
      function fn() {}

      const result = deepcopy({
        a: fn,
        b: fn
      });

      assert(result.a === fn);
      assert(result.b === fn);
    });

    it('#7', function() {
      const result = deepcopy({
        a: {
          x: new Date(),
          y: new Date()
        },
        b: {
          x: 1,
          y: 1
        }
      });

      assert(result.a.x instanceof Date);
      assert(result.a.y instanceof Date);
      assert(result.b.x === 1);
      assert(result.b.y === 1);
    });

    it('#9', function() {
      const result = deepcopy([
        {
          a: 1,
          b: 1
        },
        {
          a: 2,
          b: 2
        }
      ]);

      assert(result[0].a === 1);
      assert(result[0].b === 1);
      assert(result[1].a === 2);
      assert(result[1].b === 2);
    });

    it('#10', function() {
      function fn() {}

      const result = deepcopy([{ a: fn, b: 'asdf' }, { x: fn, y: 'asdf' }]);

      assert(result[0].a === fn);
      assert(result[0].b === 'asdf');
      assert(result[1].x === fn);
      assert(result[1].y === 'asdf');
    });

    it('#11', function() {
      const result = deepcopy({
        a: 1,
        b: 2,
        c: 3,
        d: function() {},
        e: 4,
        f: []
      });

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);
      assert(typeof result.d === 'function');
      assert(result.e === 4);
      assert(Array.isArray(result.f));
    });

    it('#12', function() {
      const result = deepcopy({
        a: 1,
        b: 2,
        c: 3,
        d: {
          e: {
            f: false
          }
        }
      });

      assert(result.a === 1);
      assert(result.b === 2);
      assert(result.c === 3);
      assert(result.d.e.f === false);
    });
  });
});
