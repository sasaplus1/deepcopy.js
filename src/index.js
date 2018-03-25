const typeDetect = require('type-detect');

const buffer = require('./buffer.js');
const copyMaps = require('./copy_maps.js');

const collectionTypesRegExp = new RegExp(
  ['Arguments', 'Array', 'Map', 'Object', 'Set'].join('|')
);
const unknownValue = Symbol('deepcopy.js unknown value symbol');

/**
 * DeepCopy class
 *
 * @class
 */
function DeepCopy() {
  // TODO: before/after customizer
  this._customizer = null;
  // TODO: max depth implementation
  this._maxDepth = Infinity;
  this._references = null;
  this._visited = null;
}

/**
 * detect type of value
 *
 * @param {*} value
 * @return {string}
 */
DeepCopy.prototype._detectType = function _detectType(value) {
  // NOTE: isBuffer must execute before typeDetect,
  // because typeDetect returns 'Uint8Array'.
  if (buffer.isBuffer(value)) {
    return 'Buffer';
  }

  return typeDetect(value);
};

/**
 * copy value
 *
 * @param {*} value
 * @param {string} [type=null]
 * @return {*}
 */
DeepCopy.prototype._copy = function _copy(value, type = null) {
  const valueType = type || this._detectType(value);
  const copyFunction = copyMaps.get(valueType);

  if (copyFunction) {
    return copyFunction(value, valueType);
  }

  const result = this._customizer(value);

  return typeof result === 'undefined' ? result : unknownValue;
};

/**
 * recursively copy
 *
 * @param {*} value
 * @param {*} clone
 * @return {*}
 */
DeepCopy.prototype._recursiveCopy = function _recursiveCopy(value, clone) {
  const type = this._detectType(value);
  const copiedValue = this._copy(value, type);

  // return if not a collection value
  if (!collectionTypesRegExp.test(type)) {
    return copiedValue;
  }

  const keys = Object.keys(value).concat(Object.getOwnPropertySymbols(value));

  for (let i = 0, len = keys.length; i < len; ++i) {
    const collectionKey = keys[i];
    const collectionValue = value[collectionKey];

    if (this._visited.has(collectionValue)) {
      // TODO: Map/Set
      clone[collectionKey] = this._references.get(collectionValue);
    } else {
      const collectionValueType = this._detectType(collectionValue);
      const copiedCollectionValue = this._copy(
        collectionValue,
        collectionValueType
      );

      // save reference if collection
      if (collectionTypesRegExp.test(collectionValueType)) {
        this._references.set(collectionValue, copiedCollectionValue);
        this._visited.add(collectionValue);
      }

      // TODO: Map/Set
      clone[collectionKey] = this._recursiveCopy(
        collectionValue,
        copiedCollectionValue
      );
    }
  }

  return clone;
};

DeepCopy.prototype.deepcopy = function deepcopy(value) {
  const type = this._detectType(value);
  const copiedValue = this._copy(value, type);

  // return if not a collection value
  if (!collectionTypesRegExp.test(type)) {
    return copiedValue;
  }

  this._references = new WeakMap([[value, copiedValue]]);
  this._visited = new WeakSet([value]);

  const result = this._recursiveCopy(value, copiedValue);

  this._references = null;
  this._visited = null;

  return result;
};

/**
 * deepcopy function
 *
 * @param {*} value
 * @param {Object|Function} [options]
 * @return {*}
 */
function deepcopy(value, options) {
  if (typeof options === 'function') {
    options = {
      customizer: options
    };
  }

  return new DeepCopy(options).deepcopy(value);
}

module.exports = deepcopy;
