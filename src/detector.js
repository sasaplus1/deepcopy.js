const typeDetect = require('type-detect');

const { isBuffer } = require('./buffer.js');

/**
 * detect type of value
 *
 * @param {*} value
 * @return {string}
 */
function detectType(value) {
  // NOTE: isBuffer must execute before type-detect,
  // because type-detect returns 'Uint8Array'.
  if (isBuffer(value)) {
    return 'Buffer';
  }

  return typeDetect(value);
}

module.exports = {
  detectType
};
