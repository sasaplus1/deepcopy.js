const copyMap = require('./copy_map.js');
const { detectType } = require('./detector.js');

/**
 * symbol for unknown value
 */
const unknown = Symbol('unknown');

/**
 * no operation
 */
function noop() {}

/**
 * copy value
 *
 * @param {*} value
 * @param {string} [type=null]
 * @param {Function} [customizer=noop]
 * @return {*}
 */
function copy(value, type = null, customizer = noop) {
  if (arguments.length === 2 && typeof type === 'function') {
    customizer = type;
    type = null;
  }

  const valueType = type || detectType(value);
  const copyFunction = copyMap.get(valueType);

  if (copyFunction) {
    // NOTE: TypedArray needs pass type to argument
    return copyFunction(value, valueType);
  }

  const result = customizer(value, valueType);

  return result === undefined ? unknown : result;
}

module.exports = {
  copy,
  unknown
};
