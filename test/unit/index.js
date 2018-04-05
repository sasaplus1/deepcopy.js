describe('deepcopy', function() {
  describe('types', function() {
    it('can copy number', function() {
      assert(deepcopy(0) === 0);
      assert(deepcopy(Number.MAX_SAFE_INTEGER) === Number.MAX_SAFE_INTEGER);
      assert(deepcopy(Number.MIN_SAFE_INTEGER) === Number.MIN_SAFE_INTEGER);
      assert(deepcopy(Number.POSITIVE_INFINITY) === Number.POSITIVE_INFINITY);
      assert(deepcopy(Number.NEGATIVE_INFINITY) === Number.NEGATIVE_INFINITY);
      assert(Number.isNaN(deepcopy(NaN)));
    });

    it('can copy Number', function() {
      assert(deepcopy(new Number()) instanceof Number);
    });

    it('can copy string', function() {
      assert(deepcopy('') === '');
    });

    it('can copy String', function() {
      assert(deepcopy(new String()) instanceof String);
    });

    it('can copy boolean', function() {
      assert(deepcopy(true) === true);
      assert(deepcopy(false) === false);
    });

    it('can copy Boolean', function() {
      assert(deepcopy(new Boolean()) instanceof Boolean);
    });

    it('can copy null', function() {
      assert(deepcopy(null) === null);
    });

    it('can copy undefined', function() {
      assert(deepcopy(undefined) === undefined);
    });

    it('can copy symbol', function() {
      const symbol = Symbol();

      assert(deepcopy(symbol) === symbol);
    });
  });
});
