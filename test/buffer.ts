import assert = require('assert');

import { cloneBuffer, isBuffer } from '../src/buffer';

describe('buffer', function () {
  before(function () {
    if (typeof Buffer === 'undefined') {
      this.skip();
    }
  });
  describe('cloneBuffer', function () {
    it('should clone Buffer', function () {
      const buffer = Buffer.from([0xe5, 0xaf, 0xbf, 0xe5, 0x8f, 0xb8]);

      assert(buffer.equals(cloneBuffer(buffer)));
    });
  });
  describe('isBuffer', function () {
    it('should return true if value is Buffer', function () {
      const buffer = Buffer.from([0xe5, 0xaf, 0xbf, 0xe5, 0x8f, 0xb8]);

      assert(isBuffer(buffer));
    });
    it('should return false if value is not Buffer', function () {
      assert(!isBuffer(null));
    });
  });
});
