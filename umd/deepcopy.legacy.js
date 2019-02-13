/*!
 * @license deepcopy.js Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/deepcopy.js
 * Released under the MIT license.
 *
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.deepcopy = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = /*#__PURE__*/Object.freeze({
		default: _global,
		__moduleExports: _global
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.4' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _core$1 = /*#__PURE__*/Object.freeze({
		default: _core,
		__moduleExports: _core,
		version: _core_1
	});

	var _library = false;

	var _library$1 = /*#__PURE__*/Object.freeze({
		default: _library,
		__moduleExports: _library
	});

	var global$1 = ( _global$1 && _global ) || _global$1;

	var SHARED = '__core-js_shared__';
	var store = global$1[SHARED] || (global$1[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var require$$0 = ( _shared$1 && _shared ) || _shared$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var _wks = createCommonjsModule(function (module) {
	var store = require$$0('wks');

	var Symbol = global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = /*#__PURE__*/Object.freeze({
		default: _wks,
		__moduleExports: _wks
	});

	var require$$0$1 = ( _wks$1 && _wks ) || _wks$1;

	var f = require$$0$1;

	var _wksExt = {
		f: f
	};

	var _wksExt$1 = /*#__PURE__*/Object.freeze({
		default: _wksExt,
		__moduleExports: _wksExt,
		f: f
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$1 = /*#__PURE__*/Object.freeze({
		default: _isObject,
		__moduleExports: _isObject
	});

	var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

	var _anObject = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$1 = /*#__PURE__*/Object.freeze({
		default: _anObject,
		__moduleExports: _anObject
	});

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$1 = /*#__PURE__*/Object.freeze({
		default: _fails,
		__moduleExports: _fails
	});

	var require$$2 = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !require$$2(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document$1) && isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var DESCRIPTORS = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var cel = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !DESCRIPTORS && !require$$2(function () {
	  return Object.defineProperty(cel('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine,
		__moduleExports: _ie8DomDefine
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive,
		__moduleExports: _toPrimitive
	});

	var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

	var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

	var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

	var dP = Object.defineProperty;

	var f$1 = DESCRIPTORS ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f$1
	};

	var _objectDp$1 = /*#__PURE__*/Object.freeze({
		default: _objectDp,
		__moduleExports: _objectDp,
		f: f$1
	});

	var require$$6 = ( _core$1 && _core ) || _core$1;

	var LIBRARY = ( _library$1 && _library ) || _library$1;

	var wksExt = ( _wksExt$1 && _wksExt ) || _wksExt$1;

	var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var defineProperty = dP$1.f;
	var _wksDefine = function (name) {
	  var $Symbol = require$$6.Symbol || (require$$6.Symbol = LIBRARY ? {} : global$1.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};

	var _wksDefine$1 = /*#__PURE__*/Object.freeze({
		default: _wksDefine,
		__moduleExports: _wksDefine
	});

	var wksDefine = ( _wksDefine$1 && _wksDefine ) || _wksDefine$1;

	wksDefine('asyncIterator');

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc,
		__moduleExports: _propertyDesc
	});

	var descriptor = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = DESCRIPTORS ? function (object, key, value) {
	  return dP$1.f(object, key, descriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var require$$0$2 = ( _hide$1 && _hide ) || _hide$1;

	var has = ( _has$1 && _has ) || _has$1;

	var _redefine = createCommonjsModule(function (module) {
	var SRC = uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	require$$6.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || require$$0$2(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || require$$0$2(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global$1) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    require$$0$2(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    require$$0$2(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _redefine$1 = /*#__PURE__*/Object.freeze({
		default: _redefine,
		__moduleExports: _redefine
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$1 = /*#__PURE__*/Object.freeze({
		default: _aFunction,
		__moduleExports: _aFunction
	});

	var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _ctx$1 = /*#__PURE__*/Object.freeze({
		default: _ctx,
		__moduleExports: _ctx
	});

	var require$$1 = ( _redefine$1 && _redefine ) || _redefine$1;

	var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? require$$6 : require$$6[name] || (require$$6[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) require$$1(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) require$$0$2(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global$1.core = require$$6;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _export$1 = /*#__PURE__*/Object.freeze({
		default: _export,
		__moduleExports: _export
	});

	var _meta = createCommonjsModule(function (module) {
	var META = uid('meta');


	var setDesc = dP$1.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !require$$2(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _meta$1 = /*#__PURE__*/Object.freeze({
		default: _meta,
		__moduleExports: _meta,
		KEY: _meta_1,
		NEED: _meta_2,
		fastKey: _meta_3,
		getWeak: _meta_4,
		onFreeze: _meta_5
	});

	var def = dP$1.f;

	var TAG = require$$0$1('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
		default: _setToStringTag,
		__moduleExports: _setToStringTag
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var require$$1$1 = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return require$$1$1(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var shared = require$$0('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var require$$0$3 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var require$$0$4 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	var arrayIndexOf = require$$0$3(false);
	var IE_PROTO = require$$0$4('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var require$$0$5 = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, require$$0$5);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$2
	});

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$3
	});

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var _enumKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumKeys,
		__moduleExports: _enumKeys
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return require$$1$1(arg) == 'Array';
	};

	var _isArray$1 = /*#__PURE__*/Object.freeze({
		default: _isArray,
		__moduleExports: _isArray
	});

	var _objectDps = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP$1.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _objectDps$1 = /*#__PURE__*/Object.freeze({
		default: _objectDps,
		__moduleExports: _objectDps
	});

	var document$2 = global$1.document;
	var _html = document$2 && document$2.documentElement;

	var _html$1 = /*#__PURE__*/Object.freeze({
		default: _html,
		__moduleExports: _html
	});

	var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

	var html = ( _html$1 && _html ) || _html$1;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = require$$0$4('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe');
	  var i = require$$0$5.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][require$$0$5[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectCreate$1 = /*#__PURE__*/Object.freeze({
		default: _objectCreate,
		__moduleExports: _objectCreate
	});

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = require$$0$5.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	var _objectGopn$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopn,
		__moduleExports: _objectGopn,
		f: f$4
	});

	var require$$0$6 = ( _objectGopn$1 && _objectGopn ) || _objectGopn$1;

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = require$$0$6.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var _objectGopnExt$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopnExt,
		__moduleExports: _objectGopnExt,
		f: f$5
	});

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = DESCRIPTORS ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return descriptor(!pIE.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	var _objectGopd$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopd,
		__moduleExports: _objectGopd,
		f: f$6
	});

	var $export$1 = ( _export$1 && _export ) || _export$1;

	var require$$1$2 = ( _meta$1 && _meta ) || _meta$1;

	var require$$4 = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

	var enumKeys = ( _enumKeys$1 && _enumKeys ) || _enumKeys$1;

	var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

	var create = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

	var gOPNExt = ( _objectGopnExt$1 && _objectGopnExt ) || _objectGopnExt$1;

	var require$$1$3 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

	// ECMAScript 6 symbols shim





	var META = require$$1$2.KEY;



















	var gOPD$1 = require$$1$3.f;
	var dP$2 = dP$1.f;
	var gOPN$1 = gOPNExt.f;
	var $Symbol = global$1.Symbol;
	var $JSON = global$1.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = require$$0$1('_hidden');
	var TO_PRIMITIVE = require$$0$1('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = require$$0('symbol-registry');
	var AllSymbols = require$$0('symbols');
	var OPSymbols = require$$0('op-symbols');
	var ObjectProto = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global$1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && require$$2(function () {
	  return create(dP$2({}, 'a', {
	    get: function () { return dP$2(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP$2(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP$2(ObjectProto, key, protoDesc);
	} : dP$2;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = create($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP$2(it, HIDDEN, descriptor(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = create(D, { enumerable: descriptor(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$2(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create$$1(it, P) {
	  return P === undefined ? create(it) : $defineProperties(create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN$1(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, descriptor(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  require$$1($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  require$$1$3.f = $getOwnPropertyDescriptor;
	  dP$1.f = $defineProperty;
	  require$$0$6.f = gOPNExt.f = $getOwnPropertyNames;
	  pIE.f = $propertyIsEnumerable;
	  gOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !LIBRARY) {
	    require$$1(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(require$$0$1(name));
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)require$$0$1(es6Symbols[j++]);

	for (var wellKnownSymbols = getKeys(require$$0$1.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$1($export$1.S + $export$1.F * (!USE_NATIVE || require$$2(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || require$$0$2($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	require$$4($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	require$$4(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	require$$4(global$1.JSON, 'JSON', true);

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (require$$6.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * require$$2(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	var require$$0$7 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.14 Object.keys(O)



	require$$0$7('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) require$$1(target, key, src[key], safe);
	  return target;
	};

	var _redefineAll$1 = /*#__PURE__*/Object.freeze({
		default: _redefineAll,
		__moduleExports: _redefineAll
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _anInstance$1 = /*#__PURE__*/Object.freeze({
		default: _anInstance,
		__moduleExports: _anInstance
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterCall$1 = /*#__PURE__*/Object.freeze({
		default: _iterCall,
		__moduleExports: _iterCall
	});

	var _iterators = {};

	var _iterators$1 = /*#__PURE__*/Object.freeze({
		default: _iterators,
		__moduleExports: _iterators
	});

	var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

	// check on default Array iterator

	var ITERATOR = require$$0$1('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

	var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
		default: _isArrayIter,
		__moduleExports: _isArrayIter
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = require$$0$1('toStringTag');
	// ES3 wrong here
	var ARG = require$$1$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? require$$1$1(O)
	    // ES3 arguments fallback
	    : (B = require$$1$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _classof$1 = /*#__PURE__*/Object.freeze({
		default: _classof,
		__moduleExports: _classof
	});

	var classof = ( _classof$1 && _classof ) || _classof$1;

	var ITERATOR$1 = require$$0$1('iterator');

	var core_getIteratorMethod = require$$6.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

	var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
		default: core_getIteratorMethod,
		__moduleExports: core_getIteratorMethod
	});

	var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

	var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

	var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var _forOf$1 = /*#__PURE__*/Object.freeze({
		default: _forOf,
		__moduleExports: _forOf
	});

	var SPECIES = require$$0$1('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	var _arraySpeciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesConstructor,
		__moduleExports: _arraySpeciesConstructor
	});

	var speciesConstructor = ( _arraySpeciesConstructor$1 && _arraySpeciesConstructor ) || _arraySpeciesConstructor$1;

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor(original))(length);
	};

	var _arraySpeciesCreate$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesCreate,
		__moduleExports: _arraySpeciesCreate
	});

	var asc = ( _arraySpeciesCreate$1 && _arraySpeciesCreate ) || _arraySpeciesCreate$1;

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || asc;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = IObject(O);
	    var f = ctx(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	var _arrayMethods$1 = /*#__PURE__*/Object.freeze({
		default: _arrayMethods,
		__moduleExports: _arrayMethods
	});

	var _validateCollection = function (it, TYPE) {
	  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var _validateCollection$1 = /*#__PURE__*/Object.freeze({
		default: _validateCollection,
		__moduleExports: _validateCollection
	});

	var require$$3 = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

	var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

	var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

	var createArrayMethod = ( _arrayMethods$1 && _arrayMethods ) || _arrayMethods$1;

	var validate = ( _validateCollection$1 && _validateCollection ) || _validateCollection$1;

	var getWeak = require$$1$2.getWeak;







	var arrayFind = createArrayMethod(5);
	var arrayFindIndex = createArrayMethod(6);
	var id$2 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$2++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    require$$3(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
	        return data && has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has$$1(key) {
	        if (!isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
	        return data && has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};
	var _collectionWeak_1 = _collectionWeak.getConstructor;
	var _collectionWeak_2 = _collectionWeak.def;
	var _collectionWeak_3 = _collectionWeak.ufstore;

	var _collectionWeak$1 = /*#__PURE__*/Object.freeze({
		default: _collectionWeak,
		__moduleExports: _collectionWeak,
		getConstructor: _collectionWeak_1,
		def: _collectionWeak_2,
		ufstore: _collectionWeak_3
	});

	var ITERATOR$2 = require$$0$1('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var _iterDetect$1 = /*#__PURE__*/Object.freeze({
		default: _iterDetect,
		__moduleExports: _iterDetect
	});

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = ctx(Function.call, require$$1$3.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var _setProto$1 = /*#__PURE__*/Object.freeze({
		default: _setProto,
		__moduleExports: _setProto,
		set: _setProto_1,
		check: _setProto_2
	});

	var require$$0$8 = ( _setProto$1 && _setProto ) || _setProto$1;

	var setPrototypeOf = require$$0$8.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var _inheritIfRequired$1 = /*#__PURE__*/Object.freeze({
		default: _inheritIfRequired,
		__moduleExports: _inheritIfRequired
	});

	var require$$7 = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

	var inheritIfRequired = ( _inheritIfRequired$1 && _inheritIfRequired ) || _inheritIfRequired$1;

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = global$1[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    require$$1(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !require$$2(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    require$$3(C.prototype, methods);
	    require$$1$2.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = require$$2(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = require$$7(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && require$$2(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  require$$4(C, NAME);

	  O[NAME] = C;
	  $export$1($export$1.G + $export$1.W + $export$1.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var _collection$1 = /*#__PURE__*/Object.freeze({
		default: _collection,
		__moduleExports: _collection
	});

	var weak = ( _collectionWeak$1 && _collectionWeak ) || _collectionWeak$1;

	var require$$0$9 = ( _collection$1 && _collection ) || _collection$1;

	var WEAK_SET = 'WeakSet';

	// 23.4 WeakSet Objects
	require$$0$9(WEAK_SET, function (get) {
	  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value) {
	    return weak.def(validate(this, WEAK_SET), value, true);
	  }
	}, weak, false, true);

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = require$$0$1('unscopables');
	var ArrayProto$1 = Array.prototype;
	if (ArrayProto$1[UNSCOPABLES] == undefined) require$$0$2(ArrayProto$1, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto$1[UNSCOPABLES][key] = true;
	};

	var _addToUnscopables$1 = /*#__PURE__*/Object.freeze({
		default: _addToUnscopables,
		__moduleExports: _addToUnscopables
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterStep$1 = /*#__PURE__*/Object.freeze({
		default: _iterStep,
		__moduleExports: _iterStep
	});

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require$$0$2(IteratorPrototype, require$$0$1('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  require$$4(Constructor, NAME + ' Iterator');
	};

	var _iterCreate$1 = /*#__PURE__*/Object.freeze({
		default: _iterCreate,
		__moduleExports: _iterCreate
	});

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = require$$0$4('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	var _objectGpo$1 = /*#__PURE__*/Object.freeze({
		default: _objectGpo,
		__moduleExports: _objectGpo
	});

	var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

	var getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

	var ITERATOR$3 = require$$0$1('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      require$$4(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR$3] != 'function') require$$0$2(IteratorPrototype, ITERATOR$3, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
	    require$$0$2(proto, ITERATOR$3, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) require$$1(proto, key, methods[key]);
	    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterDefine$1 = /*#__PURE__*/Object.freeze({
		default: _iterDefine,
		__moduleExports: _iterDefine
	});

	var addToUnscopables = ( _addToUnscopables$1 && _addToUnscopables ) || _addToUnscopables$1;

	var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

	var $iterDefine = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = $iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var es6_array_iterator$1 = /*#__PURE__*/Object.freeze({
		default: es6_array_iterator,
		__moduleExports: es6_array_iterator
	});

	var $iterators = ( es6_array_iterator$1 && es6_array_iterator ) || es6_array_iterator$1;

	var ITERATOR$4 = require$$0$1('iterator');
	var TO_STRING_TAG = require$$0$1('toStringTag');
	var ArrayValues = Iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = global$1[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$4]) require$$0$2(proto, ITERATOR$4, ArrayValues);
	    if (!proto[TO_STRING_TAG]) require$$0$2(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    if (explicit) for (key in $iterators) if (!proto[key]) require$$1(proto, key, $iterators[key], true);
	  }
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _stringAt$1 = /*#__PURE__*/Object.freeze({
		default: _stringAt,
		__moduleExports: _stringAt
	});

	var require$$0$a = ( _stringAt$1 && _stringAt ) || _stringAt$1;

	var $at = require$$0$a(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	$iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || require$$2(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var assign = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	var es6_weakMap = createCommonjsModule(function (module) {
	var each = createArrayMethod(0);







	var WEAK_MAP = 'WeakMap';
	var getWeak = require$$1$2.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak.ufstore;
	var tmp = {};
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return weak.def(validate(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = require$$0$9(WEAK_MAP, wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (require$$2(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
	  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
	  assign(InternalMap.prototype, methods);
	  require$$1$2.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    require$$1(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var _flags$1 = /*#__PURE__*/Object.freeze({
		default: _flags,
		__moduleExports: _flags
	});

	var $flags = ( _flags$1 && _flags ) || _flags$1;

	// 21.2.5.3 get RegExp.prototype.flags()
	if (DESCRIPTORS && /./g.flags != 'g') dP$1.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: $flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  require$$1(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (require$$2(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	// 7.2.8 IsRegExp(argument)


	var MATCH = require$$0$1('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : require$$1$1(it) == 'RegExp');
	};

	var _isRegexp$1 = /*#__PURE__*/Object.freeze({
		default: _isRegexp,
		__moduleExports: _isRegexp
	});

	var SPECIES$1 = require$$0$1('species');

	var _setSpecies = function (KEY) {
	  var C = global$1[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES$1]) dP$1.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _setSpecies$1 = /*#__PURE__*/Object.freeze({
		default: _setSpecies,
		__moduleExports: _setSpecies
	});

	var isRegExp = ( _isRegexp$1 && _isRegexp ) || _isRegexp$1;

	var require$$5 = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

	var dP$3 = dP$1.f;
	var gOPN$2 = require$$0$6.f;


	var $RegExp = global$1.RegExp;
	var Base = $RegExp;
	var proto$1 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (DESCRIPTORS && (!CORRECT_NEW || require$$2(function () {
	  re2[require$$0$1('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = isRegExp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto$1, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$3($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN$2(Base), i$1 = 0; keys.length > i$1;) proxy(keys[i$1++]);
	  proto$1.constructor = $RegExp;
	  $RegExp.prototype = proto$1;
	  require$$1(global$1, 'RegExp', $RegExp);
	}

	require$$5('RegExp');

	var dP$4 = dP$1.f;









	var fastKey = require$$1$2.fastKey;

	var SIZE = DESCRIPTORS ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    require$$3(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = validate(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        validate(this, NAME);
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(validate(this, NAME), key);
	      }
	    });
	    if (DESCRIPTORS) dP$4(C.prototype, 'size', {
	      get: function () {
	        return validate(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function (iterated, kind) {
	      this._t = validate(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return step(0, entry.k);
	      if (kind == 'values') return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    require$$5(NAME);
	  }
	};
	var _collectionStrong_1 = _collectionStrong.getConstructor;
	var _collectionStrong_2 = _collectionStrong.def;
	var _collectionStrong_3 = _collectionStrong.getEntry;
	var _collectionStrong_4 = _collectionStrong.setStrong;

	var _collectionStrong$1 = /*#__PURE__*/Object.freeze({
		default: _collectionStrong,
		__moduleExports: _collectionStrong,
		getConstructor: _collectionStrong_1,
		def: _collectionStrong_2,
		getEntry: _collectionStrong_3,
		setStrong: _collectionStrong_4
	});

	var strong = ( _collectionStrong$1 && _collectionStrong ) || _collectionStrong$1;

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = require$$0$9(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, strong);

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = require$$0$9(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = strong.getEntry(validate(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, strong, true);

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = require$$0$1('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? D : aFunction(S);
	};

	var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _speciesConstructor,
		__moduleExports: _speciesConstructor
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var _invoke$1 = /*#__PURE__*/Object.freeze({
		default: _invoke,
		__moduleExports: _invoke
	});

	var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

	var process = global$1.process;
	var setTask = global$1.setImmediate;
	var clearTask = global$1.clearImmediate;
	var MessageChannel = global$1.MessageChannel;
	var Dispatch = global$1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (require$$1$1(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global$1.addEventListener && typeof postMessage == 'function' && !global$1.importScripts) {
	    defer = function (id) {
	      global$1.postMessage(id + '', '*');
	    };
	    global$1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var _task$1 = /*#__PURE__*/Object.freeze({
		default: _task,
		__moduleExports: _task,
		set: _task_1,
		clear: _task_2
	});

	var require$$0$b = ( _task$1 && _task ) || _task$1;

	var macrotask = require$$0$b.set;
	var Observer = global$1.MutationObserver || global$1.WebKitMutationObserver;
	var process$1 = global$1.process;
	var Promise$1 = global$1.Promise;
	var isNode = require$$1$1(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global$1.navigator && global$1.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    var promise = Promise$1.resolve();
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global$1, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	var _microtask$1 = /*#__PURE__*/Object.freeze({
		default: _microtask,
		__moduleExports: _microtask
	});

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
		default: _newPromiseCapability,
		__moduleExports: _newPromiseCapability,
		f: f$7
	});

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _perform$1 = /*#__PURE__*/Object.freeze({
		default: _perform,
		__moduleExports: _perform
	});

	var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

	var _promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
		default: _promiseResolve,
		__moduleExports: _promiseResolve
	});

	var speciesConstructor$1 = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

	var require$$1$4 = ( _microtask$1 && _microtask ) || _microtask$1;

	var perform = ( _perform$1 && _perform ) || _perform$1;

	var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

	var task = require$$0$b.set;
	var microtask = require$$1$4();



	var PROMISE = 'Promise';
	var TypeError$1 = global$1.TypeError;
	var process$2 = global$1.process;
	var $Promise = global$1[PROMISE];
	var isNode$1 = classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[require$$0$1('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = global$1.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global$1.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global$1, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = global$1.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE$1) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = require$$3($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor$1(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE$1, { Promise: $Promise });
	require$$4($Promise, PROMISE);
	require$$5(PROMISE);
	Wrapper = require$$6[PROMISE];

	// statics
	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$1($export$1.S + $export$1.F * !(USE_NATIVE$1 && require$$7(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	var typeDetect = createCommonjsModule(function (module, exports) {
	  (function (global, factory) {
	    module.exports = factory();
	  })(commonjsGlobal, function () {
	    /* !
	     * type-detect
	     * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	     * MIT Licensed
	     */

	    var promiseExists = typeof Promise === 'function';
	    /* eslint-disable no-undef */

	    var globalObject = (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : commonjsGlobal; // eslint-disable-line id-blacklist

	    var symbolExists = typeof Symbol !== 'undefined';
	    var mapExists = typeof Map !== 'undefined';
	    var setExists = typeof Set !== 'undefined';
	    var weakMapExists = typeof WeakMap !== 'undefined';
	    var weakSetExists = typeof WeakSet !== 'undefined';
	    var dataViewExists = typeof DataView !== 'undefined';
	    var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
	    var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
	    var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
	    var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
	    var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
	    var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
	    var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
	    var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
	    var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
	    var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
	    var toStringLeftSliceLength = 8;
	    var toStringRightSliceLength = -1;
	    /**
	     * ### typeOf (obj)
	     *
	     * Uses `Object.prototype.toString` to determine the type of an object,
	     * normalising behaviour across engine versions & well optimised.
	     *
	     * @param {Mixed} object
	     * @return {String} object type
	     * @api public
	     */

	    function typeDetect(obj) {
	      /* ! Speed optimisation
	       * Pre:
	       *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
	       *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
	       *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
	       *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
	       *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
	       * Post:
	       *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
	       *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
	       *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
	       *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
	       *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
	       */
	      var typeofObj = _typeof(obj);

	      if (typeofObj !== 'object') {
	        return typeofObj;
	      }
	      /* ! Speed optimisation
	       * Pre:
	       *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
	       * Post:
	       *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
	       */


	      if (obj === null) {
	        return 'null';
	      }
	      /* ! Spec Conformance
	       * Test: `Object.prototype.toString.call(window)``
	       *  - Node === "[object global]"
	       *  - Chrome === "[object global]"
	       *  - Firefox === "[object Window]"
	       *  - PhantomJS === "[object Window]"
	       *  - Safari === "[object Window]"
	       *  - IE 11 === "[object Window]"
	       *  - IE Edge === "[object Window]"
	       * Test: `Object.prototype.toString.call(this)``
	       *  - Chrome Worker === "[object global]"
	       *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
	       *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
	       *  - IE 11 Worker === "[object WorkerGlobalScope]"
	       *  - IE Edge Worker === "[object WorkerGlobalScope]"
	       */


	      if (obj === globalObject) {
	        return 'global';
	      }
	      /* ! Speed optimisation
	       * Pre:
	       *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
	       * Post:
	       *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
	       */


	      if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
	        return 'Array';
	      } // Not caching existence of `window` and related properties due to potential
	      // for `window` to be unset before tests in quasi-browser environments.


	      if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window !== null) {
	        /* ! Spec Conformance
	         * (https://html.spec.whatwg.org/multipage/browsers.html#location)
	         * WhatWG HTML$7.7.3 - The `Location` interface
	         * Test: `Object.prototype.toString.call(window.location)``
	         *  - IE <=11 === "[object Object]"
	         *  - IE Edge <=13 === "[object Object]"
	         */
	        if (_typeof(window.location) === 'object' && obj === window.location) {
	          return 'Location';
	        }
	        /* ! Spec Conformance
	         * (https://html.spec.whatwg.org/#document)
	         * WhatWG HTML$3.1.1 - The `Document` object
	         * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	         *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
	         *       which suggests that browsers should use HTMLTableCellElement for
	         *       both TD and TH elements. WhatWG separates these.
	         *       WhatWG HTML states:
	         *         > For historical reasons, Window objects must also have a
	         *         > writable, configurable, non-enumerable property named
	         *         > HTMLDocument whose value is the Document interface object.
	         * Test: `Object.prototype.toString.call(document)``
	         *  - Chrome === "[object HTMLDocument]"
	         *  - Firefox === "[object HTMLDocument]"
	         *  - Safari === "[object HTMLDocument]"
	         *  - IE <=10 === "[object Document]"
	         *  - IE 11 === "[object HTMLDocument]"
	         *  - IE Edge <=13 === "[object HTMLDocument]"
	         */


	        if (_typeof(window.document) === 'object' && obj === window.document) {
	          return 'Document';
	        }

	        if (_typeof(window.navigator) === 'object') {
	          /* ! Spec Conformance
	           * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
	           * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
	           * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
	           *  - IE <=10 === "[object MSMimeTypesCollection]"
	           */
	          if (_typeof(window.navigator.mimeTypes) === 'object' && obj === window.navigator.mimeTypes) {
	            return 'MimeTypeArray';
	          }
	          /* ! Spec Conformance
	           * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	           * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
	           * Test: `Object.prototype.toString.call(navigator.plugins)``
	           *  - IE <=10 === "[object MSPluginsCollection]"
	           */


	          if (_typeof(window.navigator.plugins) === 'object' && obj === window.navigator.plugins) {
	            return 'PluginArray';
	          }
	        }

	        if ((typeof window.HTMLElement === 'function' || _typeof(window.HTMLElement) === 'object') && obj instanceof window.HTMLElement) {
	          /* ! Spec Conformance
	          * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
	          * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
	          * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
	          *  - IE <=10 === "[object HTMLBlockElement]"
	          */
	          if (obj.tagName === 'BLOCKQUOTE') {
	            return 'HTMLQuoteElement';
	          }
	          /* ! Spec Conformance
	           * (https://html.spec.whatwg.org/#htmltabledatacellelement)
	           * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
	           * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	           *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	           *       which suggests that browsers should use HTMLTableCellElement for
	           *       both TD and TH elements. WhatWG separates these.
	           * Test: Object.prototype.toString.call(document.createElement('td'))
	           *  - Chrome === "[object HTMLTableCellElement]"
	           *  - Firefox === "[object HTMLTableCellElement]"
	           *  - Safari === "[object HTMLTableCellElement]"
	           */


	          if (obj.tagName === 'TD') {
	            return 'HTMLTableDataCellElement';
	          }
	          /* ! Spec Conformance
	           * (https://html.spec.whatwg.org/#htmltableheadercellelement)
	           * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
	           * Note: Most browsers currently adher to the W3C DOM Level 2 spec
	           *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
	           *       which suggests that browsers should use HTMLTableCellElement for
	           *       both TD and TH elements. WhatWG separates these.
	           * Test: Object.prototype.toString.call(document.createElement('th'))
	           *  - Chrome === "[object HTMLTableCellElement]"
	           *  - Firefox === "[object HTMLTableCellElement]"
	           *  - Safari === "[object HTMLTableCellElement]"
	           */


	          if (obj.tagName === 'TH') {
	            return 'HTMLTableHeaderCellElement';
	          }
	        }
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
	      *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
	      *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
	      *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
	      *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
	      *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
	      *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
	      *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
	      *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
	      * Post:
	      *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
	      *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
	      *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
	      *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
	      *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
	      *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
	      *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
	      *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
	      *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
	      */


	      var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];

	      if (typeof stringTag === 'string') {
	        return stringTag;
	      }

	      var objPrototype = Object.getPrototypeOf(obj);
	      /* ! Speed optimisation
	      * Pre:
	      *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
	      *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
	      * Post:
	      *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
	      *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
	      */

	      if (objPrototype === RegExp.prototype) {
	        return 'RegExp';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
	      * Post:
	      *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
	      */


	      if (objPrototype === Date.prototype) {
	        return 'Date';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
	       * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
	       * Test: `Object.prototype.toString.call(Promise.resolve())``
	       *  - Chrome <=47 === "[object Object]"
	       *  - Edge <=20 === "[object Object]"
	       *  - Firefox 29-Latest === "[object Promise]"
	       *  - Safari 7.1-Latest === "[object Promise]"
	       */


	      if (promiseExists && objPrototype === Promise.prototype) {
	        return 'Promise';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
	      * Post:
	      *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
	      */


	      if (setExists && objPrototype === Set.prototype) {
	        return 'Set';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
	      * Post:
	      *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
	      */


	      if (mapExists && objPrototype === Map.prototype) {
	        return 'Map';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
	      * Post:
	      *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
	      */


	      if (weakSetExists && objPrototype === WeakSet.prototype) {
	        return 'WeakSet';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
	      * Post:
	      *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
	      */


	      if (weakMapExists && objPrototype === WeakMap.prototype) {
	        return 'WeakMap';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
	       * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
	       * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
	       *  - Edge <=13 === "[object Object]"
	       */


	      if (dataViewExists && objPrototype === DataView.prototype) {
	        return 'DataView';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
	       * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
	       * Test: `Object.prototype.toString.call(new Map().entries())``
	       *  - Edge <=13 === "[object Object]"
	       */


	      if (mapExists && objPrototype === mapIteratorPrototype) {
	        return 'Map Iterator';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
	       * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
	       * Test: `Object.prototype.toString.call(new Set().entries())``
	       *  - Edge <=13 === "[object Object]"
	       */


	      if (setExists && objPrototype === setIteratorPrototype) {
	        return 'Set Iterator';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
	       * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
	       * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
	       *  - Edge <=13 === "[object Object]"
	       */


	      if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
	        return 'Array Iterator';
	      }
	      /* ! Spec Conformance
	       * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
	       * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
	       * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
	       *  - Edge <=13 === "[object Object]"
	       */


	      if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
	        return 'String Iterator';
	      }
	      /* ! Speed optimisation
	      * Pre:
	      *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
	      * Post:
	      *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
	      */


	      if (objPrototype === null) {
	        return 'Object';
	      }

	      return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
	    }

	    return typeDetect;
	  });
	});

	var isBufferExists = typeof Buffer !== 'undefined';
	var isBufferFromExists = isBufferExists && typeof Buffer.from !== 'undefined';
	var isBuffer = isBufferExists ?
	/**
	 * is value is Buffer?
	 *
	 * @param {*} value
	 * @return {boolean}
	 */
	function isBuffer(value) {
	  return Buffer.isBuffer(value);
	} :
	/**
	 * return false
	 *
	 * NOTE: for Buffer unsupported
	 *
	 * @return {boolean}
	 */
	function isBuffer() {
	  return false;
	};
	var copy = isBufferFromExists ?
	/**
	 * copy Buffer
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */
	function copy(value) {
	  return Buffer.from(value);
	} : isBufferExists ?
	/**
	 * copy Buffer
	 *
	 * NOTE: for old node.js
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */
	function copy(value) {
	  return new Buffer(value);
	} :
	/**
	 * shallow copy
	 *
	 * NOTE: for Buffer unsupported
	 *
	 * @param {*}
	 * @return {*}
	 */
	function copy(value) {
	  return value;
	};

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

	/**
	 * collection types
	 */

	var collectionTypeSet = new Set(['Arguments', 'Array', 'Map', 'Object', 'Set']);
	/**
	 * get value from collection
	 *
	 * @param {Array|Object|Map|Set} collection
	 * @param {string|number|symbol} key
	 * @param {string} [type=null]
	 * @return {*}
	 */

	function get(collection, key) {
	  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	  var valueType = type || detectType(collection);

	  switch (valueType) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      return collection[key];

	    case 'Map':
	      return collection.get(key);

	    case 'Set':
	      // NOTE: Set.prototype.keys is alias of Set.prototype.values
	      // it means key is equals value
	      return key;

	    default:
	  }
	}
	/**
	 * check to type string is collection
	 *
	 * @param {string} type
	 */

	function isCollection(type) {
	  return collectionTypeSet.has(type);
	}
	/**
	 * set value to collection
	 *
	 * @param {Array|Object|Map|Set} collection
	 * @param {string|number|symbol} key
	 * @param {*} value
	 * @param {string} [type=null]
	 * @return {Array|Object|Map|Set}
	 */

	function set$1(collection, key, value) {
	  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	  var valueType = type || detectType(collection);

	  switch (valueType) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      collection[key] = value;
	      break;

	    case 'Map':
	      collection.set(key, value);
	      break;

	    case 'Set':
	      collection.add(value);
	      break;

	    default:
	  }

	  return collection;
	}

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var _stringWs$1 = /*#__PURE__*/Object.freeze({
		default: _stringWs,
		__moduleExports: _stringWs
	});

	var spaces = ( _stringWs$1 && _stringWs ) || _stringWs$1;

	var space = '[' + spaces + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = require$$2(function () {
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  $export$1($export$1.P + $export$1.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var _stringTrim$1 = /*#__PURE__*/Object.freeze({
		default: _stringTrim,
		__moduleExports: _stringTrim
	});

	var require$$3$1 = ( _stringTrim$1 && _stringTrim ) || _stringTrim$1;

	var gOPN$3 = require$$0$6.f;
	var gOPD$2 = require$$1$3.f;
	var dP$5 = dP$1.f;
	var $trim = require$$3$1.trim;
	var NUMBER = 'Number';
	var $Number = global$1[NUMBER];
	var Base$1 = $Number;
	var proto$2 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = require$$1$1(create(proto$2)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? require$$2(function () { proto$2.valueOf.call(that); }) : require$$1$1(that) != NUMBER)
	        ? inheritIfRequired(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = DESCRIPTORS ? gOPN$3(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key$1; keys$1.length > j$1; j$1++) {
	    if (has(Base$1, key$1 = keys$1[j$1]) && !has($Number, key$1)) {
	      dP$5($Number, key$1, gOPD$2(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$2;
	  proto$2.constructor = $Number;
	  require$$1(global$1, NUMBER, $Number);
	}

	var freeGlobalThis = typeof globalThis !== 'undefined' && globalThis !== null && globalThis.Object === Object && globalThis;
	var freeGlobal = typeof global !== 'undefined' && global !== null && global.Object === Object && global;
	var freeSelf = typeof self !== 'undefined' && self !== null && self.Object === Object && self;
	var globalObject = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

	/**
	 * copy ArrayBuffer
	 *
	 * @param {ArrayBuffer} value
	 * @return {ArrayBuffer}
	 */

	function copyArrayBuffer(value) {
	  return value.slice(0);
	}
	/**
	 * copy Boolean
	 *
	 * @param {Boolean} value
	 * @return {Boolean}
	 */


	function copyBoolean(value) {
	  return new Boolean(value.valueOf());
	}
	/**
	 * copy DataView
	 *
	 * @param {DataView} value
	 * @return {DataView}
	 */


	function copyDataView(value) {
	  // TODO: copy ArrayBuffer?
	  return new DataView(value.buffer);
	}
	/**
	 * copy Buffer
	 *
	 * @param {Buffer} value
	 * @return {Buffer}
	 */


	function copyBuffer(value) {
	  return copy(value);
	}
	/**
	 * copy Date
	 *
	 * @param {Date} value
	 * @return {Date}
	 */


	function copyDate(value) {
	  return new Date(value.getTime());
	}
	/**
	 * copy Number
	 *
	 * @param {Number} value
	 * @return {Number}
	 */


	function copyNumber(value) {
	  return new Number(value);
	}
	/**
	 * copy RegExp
	 *
	 * @param {RegExp} value
	 * @return {RegExp}
	 */


	function copyRegExp(value) {
	  return new RegExp(value.source || '(?:)', value.flags);
	}
	/**
	 * copy String
	 *
	 * @param {String} value
	 * @return {String}
	 */


	function copyString(value) {
	  return new String(value);
	}
	/**
	 * copy TypedArray
	 *
	 * @param {*} value
	 * @return {*}
	 */


	function copyTypedArray(value, type) {
	  return globalObject[type].from(value);
	}
	/**
	 * shallow copy
	 *
	 * @param {*} value
	 * @return {*}
	 */


	function shallowCopy(value) {
	  return value;
	}
	/**
	 * get empty Array
	 *
	 * @return {Array}
	 */


	function getEmptyArray() {
	  return [];
	}
	/**
	 * get empty Map
	 *
	 * @return {Map}
	 */


	function getEmptyMap() {
	  return new Map();
	}
	/**
	 * get empty Object
	 *
	 * @return {Object}
	 */


	function getEmptyObject() {
	  return {};
	}
	/**
	 * get empty Set
	 *
	 * @return {Set}
	 */


	function getEmptySet() {
	  return new Set();
	}

	var copyMap = new Map([// deep copy
	['ArrayBuffer', copyArrayBuffer], ['Boolean', copyBoolean], ['Buffer', copyBuffer], ['DataView', copyDataView], ['Date', copyDate], ['Number', copyNumber], ['RegExp', copyRegExp], ['String', copyString], // typed arrays
	// TODO: pass bound function
	['Float32Array', copyTypedArray], ['Float64Array', copyTypedArray], ['Int16Array', copyTypedArray], ['Int32Array', copyTypedArray], ['Int8Array', copyTypedArray], ['Uint16Array', copyTypedArray], ['Uint32Array', copyTypedArray], ['Uint8Array', copyTypedArray], ['Uint8ClampedArray', copyTypedArray], // shallow copy
	['Array Iterator', shallowCopy], ['Map Iterator', shallowCopy], ['Promise', shallowCopy], ['Set Iterator', shallowCopy], ['String Iterator', shallowCopy], ['function', shallowCopy], ['global', shallowCopy], // NOTE: WeakMap and WeakSet cannot get entries
	['WeakMap', shallowCopy], ['WeakSet', shallowCopy], // primitives
	['boolean', shallowCopy], ['null', shallowCopy], ['number', shallowCopy], ['string', shallowCopy], ['symbol', shallowCopy], ['undefined', shallowCopy], // collections
	// NOTE: return empty value, because recursively copy later.
	['Arguments', getEmptyArray], ['Array', getEmptyArray], ['Map', getEmptyMap], ['Object', getEmptyObject], ['Set', getEmptySet] // NOTE: type-detect returns following types
	// 'Location'
	// 'Document'
	// 'MimeTypeArray'
	// 'PluginArray'
	// 'HTMLQuoteElement'
	// 'HTMLTableDataCellElement'
	// 'HTMLTableHeaderCellElement'
	// TODO: is type-detect never return 'object'?
	// 'object'
	]);

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


	function copy$1(value) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var customizer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

	  if (arguments.length === 2 && typeof type === 'function') {
	    customizer = type;
	    type = null;
	  }

	  var valueType = type || detectType(value);
	  var copyFunction = copyMap.get(valueType);

	  if (valueType === 'Object') {
	    var result = customizer(value, valueType);

	    if (result !== undefined) {
	      return result;
	    }
	  } // NOTE: TypedArray needs pass type to argument


	  return copyFunction ? copyFunction(value, valueType) : value;
	}

	/**
	 * deepcopy function
	 *
	 * @param {*} value
	 * @param {Object|Function} [options]
	 * @return {*}
	 */

	function deepcopy(value) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (typeof options === 'function') {
	    options = {
	      customizer: options
	    };
	  }

	  var _options = options,
	      customizer = _options.customizer;
	  var valueType = detectType(value);

	  if (!isCollection(valueType)) {
	    return recursiveCopy(value, null, null, null, customizer);
	  }

	  var copiedValue = copy$1(value, valueType, customizer);
	  var references = new WeakMap([[value, copiedValue]]);
	  var visited = new WeakSet([value]);
	  return recursiveCopy(value, copiedValue, references, visited, customizer);
	}
	/**
	 * recursively copy
	 *
	 * @param {*} value target value
	 * @param {*} clone clone of value
	 * @param {WeakMap} references visited references of clone
	 * @param {WeakSet} visited visited references of value
	 * @param {Function} customizer user customize function
	 * @return {*}
	 */

	function recursiveCopy(value, clone, references, visited, customizer) {
	  var _keys;

	  var type = detectType(value);
	  var copiedValue = copy$1(value, type); // return if not a collection value

	  if (!isCollection(type)) {
	    return copiedValue;
	  }

	  var keys;

	  switch (type) {
	    case 'Arguments':
	    case 'Array':
	      keys = Object.keys(value);
	      break;

	    case 'Object':
	      keys = Object.keys(value);

	      (_keys = keys).push.apply(_keys, _toConsumableArray(Object.getOwnPropertySymbols(value)));

	      break;

	    case 'Map':
	    case 'Set':
	      keys = value.keys();
	      break;

	    default:
	  } // walk within collection with iterator


	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var collectionKey = _step.value;
	      var collectionValue = get(value, collectionKey, type);

	      if (visited.has(collectionValue)) {
	        // for [Circular]
	        set$1(clone, collectionKey, references.get(collectionValue), type);
	      } else {
	        var collectionValueType = detectType(collectionValue);
	        var copiedCollectionValue = copy$1(collectionValue, collectionValueType); // save reference if value is collection

	        if (isCollection(collectionValueType)) {
	          references.set(collectionValue, copiedCollectionValue);
	          visited.add(collectionValue);
	        }

	        set$1(clone, collectionKey, recursiveCopy(collectionValue, copiedCollectionValue, references, visited, customizer), type);
	      }
	    } // TODO: isSealed/isFrozen/isExtensible

	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return != null) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return clone;
	}

	return deepcopy;

}));
//# sourceMappingURL=deepcopy.legacy.js.map
