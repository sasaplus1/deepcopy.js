const isBufferExists = typeof Buffer !== 'undefined';
const isBufferFromExists = isBufferExists && typeof Buffer.from !== 'undefined';

const isBuffer = isBufferExists
  ? function isBuffer(value) {
      return Buffer.isBuffer(value);
    }
  : function isBuffer() {
      return false;
    };

const copy = isBufferFromExists
  ? function copy(value) {
      return Buffer.from(value);
    }
  : isBufferExists
    ? function copy(value) {
        return new Buffer(value);
      }
    : function copy(value) {
        return value;
      };

module.exports = {
  copy,
  isBuffer
};
