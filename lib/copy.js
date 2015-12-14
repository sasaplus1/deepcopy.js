const toString = Object.prototype.toString;

function copy(target, customizer) {
  const resultValue = copyValue(target);

  if (resultValue !== null) {
    return copyValue(target);
  }

  return copyCollection(target, customizer);
}

function copyValue(target) {
  const targetType = typeof target;

  // copy String, Number, Boolean, undefined and Symbol
  // without null and Function
  if (target !== null && targetType !== 'object' && targetType !== 'function') {
    return target;
  }

  return null;
}

function copyCollection(target, customizer) {
  if (typeof customizer !== 'function') {
    throw new TypeError('customizer is must be a Function');
  }

  // TODO: how to copy when passed native function?
  if (typeof target === 'function') {
    return (new Function(`return ${target}`)());
  }

  const stringifiedTarget = toString.call(target);

  if (stringifiedTarget === '[object Array]') {
    return [];
  }

  if (stringifiedTarget === '[object Object]' &&
      target.constructor === Object) {
    return {};
  }

  if (stringifiedTarget === '[object Date]') {
    // NOTE:
    //
    //   Firefox need to convert
    //
    //   Firefox:
    //     var date = new Date;
    //     +date;            // 1420909365967
    //     +new Date(date);  // 1420909365000
    //     +new Date(+date); // 1420909365967
    //
    //   Chrome:
    //     var date = new Date;
    //     +date;            // 1420909757913
    //     +new Date(date);  // 1420909757913
    //     +new Date(+date); // 1420909757913
    return new Date(+target);
  }

  if (stringifiedTarget === '[object RegExp]') {
    // NOTE:
    //
    //   Chrome, Safari:
    //     (new RegExp).source => "(?:)"
    //
    //   Firefox:
    //     (new RegExp).source => ""
    //
    //   Chrome, Safari, Firefox:
    //     String(new RegExp) => "/(?:)/"
    const regexpText = String(target),
          slashIndex = regexpText.lastIndexOf('/');

    return new RegExp(
      regexpText.slice(1, slashIndex),
      regexpText.slice(slashIndex + 1)
    );
  }

  if (Buffer.isBuffer(target)) {
    const buffer = new Buffer(target.length);

    target.copy(buffer);

    return buffer;
  }

  const customizerResult = customizer(target);

  if (customizerResult !== void 0) {
    return customizerResult;
  }

  return null;
}

export default {
  copy,
  copyCollection,
  copyValue,
};
