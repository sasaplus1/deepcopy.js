import typeDetect from 'type-detect';

/**
 * is Buffer implemented?
 */
const isBufferExists = typeof Buffer !== 'undefined';

/**
 * is it Buffer?
 */
const isBuffer = isBufferExists
  ? function isBuffer(value: unknown): value is Buffer {
      return Buffer.isBuffer(value);
    }
  : function isBuffer(): boolean {
      // return false every time if Buffer unsupported
      return false;
    };

/**
 * clone Buffer
 */
const cloneBuffer = isBufferExists
  ? function cloneBuffer(value: Buffer) {
      return Buffer.from(value);
    }
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function cloneBuffer(value: unknown): any {
      return value;
    };

type TypeName =
  // deep copy
  | 'ArrayBuffer'
  | 'Boolean'
  | 'Buffer'
  | 'DataView'
  | 'Date'
  | 'Number'
  | 'RegExp'
  | 'String'
  // typed arrays
  | 'Float32Array'
  | 'Float64Array'
  | 'Int16Array'
  | 'Int32Array'
  | 'Int8Array'
  | 'Uint16Array'
  | 'Uint32Array'
  | 'Uint8Array'
  | 'Uint8ClampedArray'
  // shallow copy
  | 'Array Iterator'
  | 'Map Iterator'
  | 'Promise'
  | 'Set Iterator'
  | 'String Iterator'
  | 'WeakMap'
  | 'WeakSet'
  | 'function'
  | 'global'
  // primitives
  | 'boolean'
  | 'null'
  | 'number'
  | 'string'
  | 'symbol'
  | 'undefined'
  // collections
  | 'Arguments'
  | 'Array'
  | 'Map'
  | 'Object'
  | 'Set';

/**
 * detect and return type name
 *
 * @param value
 */
function detectType(value: unknown): TypeName {
  // NOTE: isBuffer must execute before type-detect,
  // because type-detect returns 'Uint8Array'.
  if (isBuffer(value)) {
    return 'Buffer';
  }

  return typeDetect(value) as TypeName;
}

/***/
function copy(
  value: unknown,
  valueType: TypeName,
  customizer: Customizer | null = null
): unknown {}

////
//

type Customizer = (value: unknown, type: string) => unknown;

export type Options = { customizer?: Customizer };

// export function deepcopy<T>(value: T, options? Options) : T{
// }
