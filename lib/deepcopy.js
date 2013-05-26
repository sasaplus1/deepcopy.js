/*!
 * deepcopy Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/deepcopy
 * Released under the MIT License.
 */

var util = require('util');


/**
 * get deep copy of target.
 *
 * return deep copy if target is Date, RegExp or primitive types.
 * return shallow copy if target is function.
 *
 * do recursive copy if target is Array or Object.
 * also can copy if target has circular reference.
 *
 * @param {*} target target of deep copy.
 * @return {*} deep copy value.
 */
module.exports = function deepcopy(target) {
  var clone = (util.isArray(target)) ? [] : {};

  /**
   * get deep copy of target.
   *
   * @private
   * @param {*} target target of deep copy.
   * @param {Object|Array} clone reference of deep copy value.
   * @param {Object[]} visited copied references.
   * @param {Object[]} ref reference of own.
   * @return {*} deep copy value.
   */
  return (function(target, clone, visited, ref) {
    var keys,
        i, len,
        key, value,
        index, object, reference;

    // number, string, boolean, null, undefined and function
    if (target === null || typeof target !== 'object') {
      return target;
    }

    if (util.isDate(target)) {
      return new Date(
          Number(target));
    }

    if (util.isRegExp(target)) {
      return new RegExp(
          target.source,
          String(target).slice(target.source.length + 2));
    }

    keys = Object.keys(target);

    for (i = 0, len = keys.length; i < len; ++i) {
      key = keys[i];
      value = target[key];

      // if value is reference types
      if (value instanceof Object) {
        index = visited.indexOf(value);
        if (index === -1) {
          object = (util.isArray(value)) ? [] : {};
          visited.push(value);
          ref.push(object);
        } else {
          reference = ref[index];
        }
      }

      // not used object if target is not reference type.
      clone[key] = reference || arguments.callee(value, object, visited, ref);
      index = object = reference = void 0;
    }

    return clone;
  }(target, clone, [target], [clone]));
};
