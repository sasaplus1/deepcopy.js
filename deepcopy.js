/*!
 * @license deepcopy.js Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/deepcopy.js
 * Released under the MIT license.
 */


/**
 * export to AMD/CommonJS/global.
 *
 * @param {Object} global global object.
 * @param {Function} factory factory method.
 */
(function(global, factory) {
  'use strict';

  if (typeof define === 'function' && !!define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    global.deepcopy = factory();
  }
}(this, function() {
  'use strict';

  var isNode, util, isBuffer, getKeys, getSymbols, indexOfArray;

  // is node.js/io.js?
  isNode = (typeof process !== 'undefined' && typeof require !== 'undefined');

  // fallback util module for browser.
  util = (isNode) ? require('util') : (function() {
    function isArray(value) {
      return (typeof value === 'object' &&
          Object.prototype.toString.call(value) === '[object Array]');
    }

    function isDate(value) {
      return (typeof value === 'object' &&
          Object.prototype.toString.call(value) === '[object Date]');
    }

    function isRegExp(value) {
      return (typeof value === 'object' &&
          Object.prototype.toString.call(value) === '[object RegExp]');
    }

    function isSymbol(value) {
      return (typeof value === 'symbol');
    }

    return {
      isArray: (typeof Array.isArray === 'function') ?
          function(obj) {
            return Array.isArray(obj);
          } : isArray,
      isDate: isDate,
      isRegExp: isRegExp,
      isSymbol: (typeof Symbol === 'function') ?
          isSymbol :
          function() {
            // always return false when Symbol is not supported.
            return false;
          }
    };
  }());

  // fallback Buffer.isBuffer
  isBuffer = (isNode) ?
      function(obj) {
        return Buffer.isBuffer(obj);
      } :
      function() {
        // if browser, always return false
        return false;
      };

  // fallback Object.keys for old browsers.
  getKeys = (typeof Object.keys === 'function') ?
      function(obj) {
        return Object.keys(obj);
      } :
      function(obj) {
        var keys = [],
            key;

        if (obj === null || typeof obj !== 'object') {
          throw new TypeError('obj is not an Object');
        }

        for (key in obj) {
          obj.hasOwnProperty(key) && keys.push(key);
        }

        return keys;
      };

  // get symbols in object.
  getSymbols = (typeof Symbol === 'function') ?
      function(obj) {
        return Object.getOwnPropertySymbols(obj);
      } :
      function() {
        // always return empty array when Symbol is not supported.
        return [];
      };

  // fallback Array#indexOf for old browsers.
  indexOfArray = (typeof Array.prototype.indexOf === 'function') ?
      function(array, searchElement) {
        return array.indexOf(searchElement);
      } :
      function(array, searchElement) {
        var i, len;

        if (!util.isArray(array)) {
          throw new TypeError('array is not an Array');
        }

        for (i = 0, len = array.length; i < len; ++i) {
          if (array[i] === searchElement) {
            return i;
          }
        }

        return -1;
      };

  /**
   * recursive deep copy for value.
   *
   * @private
   * @param {*} value copy target.
   * @param {*} clone
   * @param {Array} visited
   * @param {Array} reference
   * @return {*} copied value.
   */
  function copyValue_(value, clone, visited, reference) {
    var str, pos, buf, keys, i, len, key, val, idx, obj, ref;

    // number, string, boolean, null, undefined, function and symbol.
    if (value === null || typeof value !== 'object') {
      return value;
    }

    // Date.
    if (util.isDate(value)) {
      // Firefox need to convert to Number
      //
      // Firefox:
      //   var date = new Date;
      //   +date;            // 1420909365967
      //   +new Date(date);  // 1420909365000
      //   +new Date(+date); // 1420909365967
      // Chrome:
      //   var date = new Date;
      //   +date;            // 1420909757913
      //   +new Date(date);  // 1420909757913
      //   +new Date(+date); // 1420909757913
      return new Date(+value);
    }

    // RegExp.
    if (util.isRegExp(value)) {
      // Chrome, Safari:
      //   (new RegExp).source => "(?:)"
      // Firefox:
      //   (new RegExp).source => ""
      // Chrome, Safari, Firefox
      //   String(new RegExp) => "/(?:)/"
      str = String(value);
      pos = str.lastIndexOf('/');

      return new RegExp(str.slice(1, pos), str.slice(pos + 1));
    }

    // Buffer, node.js only.
    if (isBuffer(value)) {
      buf = new Buffer(value.length);
      value.copy(buf);

      return buf;
    }

    // Object or Array.
    keys = getKeys(value).concat(getSymbols(value));

    for (i = 0, len = keys.length; i < len; ++i) {
      key = keys[i];
      val = value[key];

      if (val !== null && typeof val === 'object') {
        idx = indexOfArray(visited, val);

        if (idx === -1) {
          // not circular reference
          obj = (util.isArray(val)) ? [] : {};

          visited.push(val);
          reference.push(obj);
        } else {
          // circular reference
          ref = reference[idx];
        }
      }

      clone[key] = ref || copyValue_(val, obj, visited, reference);
    }

    return clone;
  }

  /**
   * deep copy for value.
   *
   * @param {*} value copy target.
   */
  function deepcopy(value) {
    var clone = (util.isArray(value)) ? [] : {},
        visited = [value],
        reference = [clone];

    return copyValue_(value, clone, visited, reference);
  }

  return deepcopy;
}));
