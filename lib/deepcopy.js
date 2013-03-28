// deepcopy Copyright(c) 2013 sasa+1
// https://github.com/sasaplus1/deepcopy
// Released under the MIT License.

var util = require('util');

function deepcopy(targetObject) {
  var targetObjectType = typeof targetObject,
      stringifiedRegExp, lastSlashIndex,
      cloneObject, keys, i, len, keyValue;

  if (targetObject === null ||
      targetObjectType === 'function' ||
      targetObjectType !== 'object') {
    return targetObject;
  }

  if (util.isDate(targetObject)) {
    return new Date(targetObject);
  }

  if (util.isRegExp(targetObject)) {
    stringifiedRegExp = String(targetObject);
    lastSlashIndex = stringifiedRegExp.lastIndexOf('/');

    return new RegExp(
        stringifiedRegExp.slice(1, lastSlashIndex),
        stringifiedRegExp.slice(lastSlashIndex + 1));
  }



  cloneObject = (util.isArray(targetObject)) ? [] : {};
  keys = Object.keys(targetObject);

  for (i = 0, len = keys.length; i < len; ++i) {
    keyValue = keys[i];
    cloneObject[keyValue] = deepcopy(targetObject[keyValue]);
  }

  return cloneObject;
}

module.exports = deepcopy;
