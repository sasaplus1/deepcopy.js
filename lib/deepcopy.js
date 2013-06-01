/*!
 * @license deepcopy.js Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/deepcopy.js
 * Released under the MIT License.
 */

(function() {

  // fallback of util methods.
  var util = (typeof module !== 'undefined') ? require('util') : (function() {

    var to = Object.prototype.toString;

    function isArray(value) {
      return (
          typeof value === 'object' &&
          to.call(value) === '[object Array]');
    }

    function isDate(value) {
      return (
          typeof value === 'object' &&
          to.call(value) === '[object Date]');
    }

    function isRegExp(value) {
      return (
          typeof value === 'object' &&
          to.call(value) === '[object RegExp]');
    }

    return {
      // use Array.isArray when can use that.
      isArray: Array.isArray || isArray,
      isDate: isDate,
      isRegExp: isRegExp
    };

  }());

  // fallback of Object.keys.
  var getKeys = Object.keys || function(object) {
    var keys = [],
        key;

    if (object === null || typeof object !== 'object') {
      throw new TypeError('parameter type is not an object');
    }

    for (key in object) {
      object.hasOwnProperty(key) && keys.push(key);
    }

    return keys;
  };

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
  function deepcopy(target) {
    var clone = (util.isArray(target)) ? [] : {},
        visited = [target],
        ref = [clone];

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
      var keys, i, len, key, value, index, object, reference;

      // number, string, boolean, null, undefined and function.
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

      keys = getKeys(target);

      for (i = 0, len = keys.length; i < len; ++i) {
        key = keys[i];
        value = target[key];

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

        // value is not reference type if object is undefined.
        // not used object variable if target is not reference type.
        clone[key] = reference || arguments.callee(value, object, visited, ref);
        index = object = reference = null;
      }

      return clone;
    }(target, clone, visited, ref));
  }

  // export function.
  if (typeof module !== 'undefined') {
    module.exports = deepcopy;
  } else {
    this.deepcopy = deepcopy;
  }

}());
