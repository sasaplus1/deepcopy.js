import assert = require('assert');

import { detectType } from '../src/detector';

describe('detector', function () {
  describe('detectType', function () {
    it('should return `Buffer` if value is Buffer', function () {
      if (typeof Buffer === 'undefined') {
        this.skip();
      }

      const buffer = Buffer.from([0xe5, 0xaf, 0xbf, 0xe5, 0x8f, 0xb8]);

      assert(detectType(buffer) === 'Buffer');
    });
    it('should return `null` if value is null', function () {
      assert(detectType(null) === 'null');
    });
  });
});
