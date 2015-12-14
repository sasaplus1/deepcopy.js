const toString = Object.prototype.toString;

function copyValue(target, customizer) {
  if (typeof customizer !== 'function') {
    throw new TypeError('customizer is must be a Function');
  }

  const targetType = typeof target;

  // NOTE:
  //
  //   string, number, boolean, undefined and symbol
  //
  //   **without null and function**
  if (target !== null && targetType !== 'object' && targetType !== 'function') {
    return target;
  }

  if (toString.call(target) === '[object Date]') {
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

  if (toString.call(target) === '[object RegExp]') {
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

    value.copy(buffer);

    return buffer;
  }

  const customizerResult = customizer(target);

  if (customizerResult !== void 0) {
    return customizerResult;
  }

  return null;
}

function copyCollection(target) {
  // TODO: how to copy when passed native function?
  if (typeof target === 'function') {
    return (new Function(`return ${target}`)());
  }

  // TODO: polyfill
  if (Array.isArray(target)) {
    return [];
  }

  // TODO: strict checking for plain object
  if (toString.call(target) === '[object Object]') {
    return {};
  }

  return null;
}

export default {
  copyCollection,
  copyValue,
};
