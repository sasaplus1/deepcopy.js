import { copyCollection, copyValue } from './copy';

function defaultCustomizer(target) {
  return void 0;
}

function deepcopy(target, customizer = defaultCustomizer) {
  if (target === null) {
    return null;
  }

  const resultValue = copyValue(target, customizer);

  // primitives or known classes
  if (resultValue !== null) {
    return resultValue;
  }

  const resultCollection = copyCollection(target);

  const clone = (resultCollection !== null) ? resultCollection : target;

  const visited = [target],
        reference = [clone];

  // recursively copy from collection
  return recursiveCopy(target, customizer, clone, visited, reference);
}

function recursiveCopy(target, customizer, clone, visited, reference) {
  if (target === null) {
    return null;
  }

  const resultValue = copyValue(target, customizer);

  // primitives or known classes
  if (resultValue !== null) {
    return resultValue;
  }

  // TODO: concat symbols
  const keys = Object.keys(target);

  let i, len;

  let key, value, index, result, ref;

  for (i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    value = target[key];

    if (value !== null && typeof value === 'object') {
      index = visited.indexOf(value);

      if (index === -1) {
        const resultValue = copyValue(target, customizer);

        if (resultValue !== null) {
          result = resultValue;
        } else {
          const resultCollection = copyCollection(target);

          result = (resultCollection !== null) ? resultCollection : target;
        }

        visited.push(value);
        reference.push(result);
      } else {
        // circular reference
        ref = reference[index];
      }
    }

    clone[key] = ref || recursiveCopy(value, customizer, result, visited, reference);
  }

  return clone;
}

export default {
  deepcopy,
  recursiveCopy,
};
