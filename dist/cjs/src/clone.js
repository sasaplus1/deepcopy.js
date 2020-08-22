"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("./buffer");
const detector_1 = require("./detector");
/**
 * clone value
 *
 * @private
 * @param value
 * @param valueType
 */
function clone(value, valueType) {
    switch (valueType) {
        // deep copy
        case 'ArrayBuffer':
            return value.slice(0);
        case 'Boolean':
            return new Boolean(value.valueOf());
        case 'Buffer':
            return /*#__INLINE__*/ buffer_1.cloneBuffer(value);
        // TODO: copy ArrayBuffer?
        case 'DataView':
            return new DataView(value.buffer);
        case 'Date':
            return new Date(value.getTime());
        case 'Number':
            return new Number(value);
        case 'RegExp':
            return new RegExp(value.source, value.flags);
        case 'String':
            return new String(value);
        // typed arrays
        case 'Float32Array':
            return new Float32Array(value);
        case 'Float64Array':
            return new Float64Array(value);
        case 'Int16Array':
            return new Int16Array(value);
        case 'Int32Array':
            return new Int32Array(value);
        case 'Int8Array':
            return new Int8Array(value);
        case 'Uint16Array':
            return new Uint16Array(value);
        case 'Uint32Array':
            return new Uint32Array(value);
        case 'Uint8Array':
            return new Uint8Array(value);
        case 'Uint8ClampedArray':
            return new Uint8ClampedArray(value);
        // shallow copy
        case 'Array Iterator':
            return value;
        case 'Map Iterator':
            return value;
        case 'Promise':
            return value;
        case 'Set Iterator':
            return value;
        case 'String Iterator':
            return value;
        case 'function':
            return value;
        case 'global':
            return value;
        // NOTE: WeakMap and WeakSet cannot get entries
        case 'WeakMap':
            return value;
        case 'WeakSet':
            return value;
        // primitives
        case 'boolean':
            return value;
        case 'null':
            return value;
        case 'number':
            return value;
        case 'string':
            return value;
        case 'symbol':
            return value;
        case 'undefined':
            return value;
        // collections
        // NOTE: return empty value: because recursively copy later.
        case detector_1.typeArguments:
            return [];
        case detector_1.typeArray:
            return [];
        case detector_1.typeMap:
            return new Map();
        case detector_1.typeObject:
            return {};
        case detector_1.typeSet:
            return new Set();
        // NOTE: type-detect returns following types
        // 'Location'
        // 'Document'
        // 'MimeTypeArray'
        // 'PluginArray'
        // 'HTMLQuoteElement'
        // 'HTMLTableDataCellElement'
        // 'HTMLTableHeaderCellElement'
        // TODO: is type-detect never return 'object'?
        // 'object'
        default:
            return value;
    }
}
exports.clone = clone;
/**
 * copy value with customizer function
 *
 * @private
 * @param value
 * @param type
 */
function copy(value, valueType, customizer = null) {
    if (customizer && valueType === 'Object') {
        const result = customizer(value, valueType);
        if (result !== undefined) {
            return result;
        }
    }
    return /*#__INLINE__*/ clone(value, valueType);
}
exports.copy = copy;
//# sourceMappingURL=clone.js.map