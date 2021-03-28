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

type SupportedTypes =
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

type DeepCopyTypes = Extract<
  SupportedTypes,
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
  // collections
  | 'Arguments'
  | 'Array'
  | 'Map'
  | 'Object'
  | 'Set'
>;

/**
 * detect and return type name
 *
 * @param value
 */
function detectType(value: unknown): SupportedTypes {
  // NOTE: isBuffer must execute before type-detect,
  // because type-detect returns 'Uint8Array'.
  return isBuffer(value) ? 'Buffer' : (typeDetect(value) as SupportedTypes);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const copyOperations: { [key in DeepCopyTypes]: (value: any) => any } = {
  // deep copy
  ArrayBuffer(value: ArrayBuffer) {
    return value.slice(0);
  },
  Boolean(value: boolean) {
    return new Boolean(value).valueOf();
  },
  Buffer(value: Buffer) {
    return cloneBuffer(value);
  },
  DataView(value: DataView) {
    // TODO: copy ArrayBuffer?
    return new DataView(value.buffer);
  },
  Date(value: Date) {
    return new Date(value).getTime();
  },
  Number(value: number) {
    return new Number(value);
  },
  RegExp(value: RegExp) {
    return new RegExp(value.source, value.flags);
  },
  String(value: string) {
    return new String(value);
  },
  // typed arrays
  Float32Array(value: Float32Array) {
    return new Float32Array(value);
  },
  Float64Array(value: Float64Array) {
    return new Float64Array(value);
  },
  Int16Array(value: Int16Array) {
    return new Int16Array(value);
  },
  Int32Array(value: Int32Array) {
    return new Int32Array(value);
  },
  Int8Array(value: Int8Array) {
    return new Int8Array(value);
  },
  Uint16Array(value: Uint16Array) {
    return new Uint16Array(value);
  },
  Uint32Array(value: Uint32Array) {
    return new Uint32Array(value);
  },
  Uint8Array(value: Uint8Array) {
    return new Uint8Array(value);
  },
  Uint8ClampedArray(value: Uint8ClampedArray) {
    return new Uint8ClampedArray(value);
  },
  // collections
  Arguments() {
    return [];
  },
  Array() {
    return [];
  },
  Map() {
    return new Map<unknown, unknown>();
  },
  Object() {
    return {};
  },
  Set() {
    return new Set<unknown>();
  }
};

export type Customizer = (value: unknown, type: string) => unknown;

/**
 * copy value with customizer function
 *
 * @param value
 * @param valueType
 * @param customizer
 */
function copy(
  value: unknown,
  valueType: SupportedTypes,
  customizer: Customizer | null = null
): unknown {
  if (customizer !== null && valueType === 'Object') {
    const result = customizer(value, valueType);

    if (result !== undefined) {
      return result;
    }
  }

  const copyOperation = copyOperations[valueType as DeepCopyTypes];

  return copyOperation ? copyOperation(value) : value;
}

type CollectionTypes = Extract<
  SupportedTypes,
  // collections
  'Arguments' | 'Array' | 'Map' | 'Object' | 'Set'
>;

const collectionTypes = new Set<CollectionTypes>();

// NOTE: IE11 cannot initialize by constructor
collectionTypes.add('Arguments');
collectionTypes.add('Array');
collectionTypes.add('Object');
collectionTypes.add('Map');
collectionTypes.add('Set');

const getKeysAndSymbols =
  // TODO: Map and Set
  typeof Reflect !== 'undefined'
    ? function getKeysAndSymbols(
        value: Record<string, unknown>,
        valueType: SupportedTypes
      ): (string | number | symbol)[] {
        return valueType === 'Array'
          ? Object.keys(value)
          : Reflect.ownKeys(value);
      }
    : function getKeysAndSymbols(
        value: Record<string | symbol, unknown>,
        valueType: SupportedTypes
      ): (string | number | symbol)[] {
        return valueType === 'Array'
          ? Object.keys(value)
          : Object.getOwnPropertyNames(value).concat(
              //eslint-disable-next-line  @typescript-eslint/ban-ts-comment
              // @ts-ignore
              Object.getOwnPropertySymbols(value)
            );
      };

function getKeys() {}

function recursiveCopy(
  value: unknown,
  clone: unknown,
  references: WeakMap<Record<string, unknown>, unknown>,
  customizer: Customizer
): unknown {
  const valueType = detectType(value);
  const copiedValue = copy(value, valueType);

  // return if not a collection
  if (!collectionTypes.has(valueType)) {
    return copiedValue;
  }

  // const keys = ;

  // TODO: isSealed/isFrozen/isExtensible

  return clone;
}

export type Options = { customizer?: Customizer };

/**
 * deep copy
 *
 * @param value
 * @param options
 */
export function deepcopy<T>(value: T, options?: Options): T {}
