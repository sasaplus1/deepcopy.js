"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBufferExists = typeof Buffer !== 'undefined';
/**
 * is it Buffer?
 *
 * @private
 */
exports.isBuffer = isBufferExists
    ? Buffer.isBuffer.bind(Buffer)
    : /**
       * return false every time if Buffer unsupported
       *
       * @private
       */
        function isBuffer(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        obj) {
            return false;
        };
/**
 * clone Buffer
 *
 * @private
 */
exports.cloneBuffer = isBufferExists
    ? Buffer.from.bind(Buffer)
    : /**
       * return argument
       * use if Buffer unsupported
       *
       * @private
       * @param value
       */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function cloneBuffer(value) {
            return value;
        };
//# sourceMappingURL=buffer.js.map