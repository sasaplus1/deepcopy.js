import { cloneBuffer } from './buffer';
import {
  typeArguments,
  typeArray,
  typeMap,
  typeObject,
  typeSet
} from './detector';

/**
 * clone value
 *
 * @private
 * @param value
 * @param valueType
 */
export function clone(value: unknown, valueType: string): unknown {
  switch (valueType) {
    // deep copy
    case 'ArrayBuffer':
      return (value as ArrayBuffer).slice(0);
    case 'Boolean':
      return new Boolean((value as boolean).valueOf());
    case 'Buffer':
      return /*#__INLINE__*/ cloneBuffer(value as Buffer);
    // TODO: copy ArrayBuffer?
    case 'DataView':
      return new DataView((value as DataView).buffer);
    case 'Date':
      return new Date((value as Date).getTime());
    case 'Number':
      return new Number(value as number);
    case 'RegExp':
      return new RegExp((value as RegExp).source, (value as RegExp).flags);
    case 'String':
      return new String(value as string);

    // typed arrays
    case 'Float32Array':
      return new Float32Array(value as Float32Array);
    case 'Float64Array':
      return new Float64Array(value as Float64Array);
    case 'Int16Array':
      return new Int16Array(value as Int16Array);
    case 'Int32Array':
      return new Int32Array(value as Int32Array);
    case 'Int8Array':
      return new Int8Array(value as Int8Array);
    case 'Uint16Array':
      return new Uint16Array(value as Uint16Array);
    case 'Uint32Array':
      return new Uint32Array(value as Uint32Array);
    case 'Uint8Array':
      return new Uint8Array(value as Uint8Array);
    case 'Uint8ClampedArray':
      return new Uint8ClampedArray(value as Uint8ClampedArray);

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
    case typeArguments:
      return [];
    case typeArray:
      return [];
    case typeMap:
      return new Map<unknown, unknown>();
    case typeObject:
      return {};
    case typeSet:
      return new Set<unknown>();

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

export type Customizer = (value: unknown, type: string) => unknown;

/**
 * copy value with customizer function
 *
 * @private
 * @param value
 * @param type
 */
export function copy(
  value: unknown,
  valueType: string,
  customizer: Customizer | null = null
): unknown {
  if (customizer && valueType === 'Object') {
    const result = customizer(value, valueType);

    if (result !== undefined) {
      return result;
    }
  }

  return /*#__INLINE__*/ clone(value, valueType);
}
