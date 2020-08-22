import {
  typeArguments,
  typeArray,
  typeMap,
  typeObject,
  typeSet
} from './detector';

export type Collection =
  | IArguments
  | Array<unknown>
  | Map<unknown, unknown>
  | Record<string | number | symbol, unknown>
  | Set<unknown>;

/**
 * Collection types
 *
 * @private
 */
const collectionTypeSet: Set<
  | typeof typeArguments
  | typeof typeArray
  | typeof typeMap
  | typeof typeObject
  | typeof typeSet
> = new Set();

// NOTE: IE11 cannot initialize Set with constructor
collectionTypeSet.add(typeArguments);
collectionTypeSet.add(typeArray);
collectionTypeSet.add(typeMap);
collectionTypeSet.add(typeObject);
collectionTypeSet.add(typeSet);

/**
 * is it Collection?
 *
 * @private
 * @param valueType
 */
export function isCollection(valueType: string): boolean {
  return /*#__INLINE__*/ collectionTypeSet.has(valueType);
}

/**
 * get keys from Collection
 *
 * @private
 * @param collection
 * @param collectionType
 */
export function getKeys(
  collection: Collection,
  collectionType: string
): Array<string | symbol> {
  switch (collectionType) {
    case typeArguments:
    case typeArray:
      return Object.keys(collection as string[]);
    case typeObject:
      return ([] as Array<string | symbol>).concat(
        // NOTE: Object.getOwnPropertyNames can get all own keys.
        Object.keys(collection as Record<string, unknown>),
        Object.getOwnPropertySymbols(collection as Record<symbol, unknown>)
      );
    case typeMap:
    case typeSet:
      return Array.from((collection as Set<string | symbol>).keys());
    default:
      return [];
  }
}

/**
 * get value from Collection
 *
 * @private
 * @param collection
 * @param key
 * @param collectionType
 */
export function getValue(
  collection: Collection,
  key: unknown,
  collectionType: string
): unknown {
  switch (collectionType) {
    case typeArguments:
    case typeArray:
    case typeObject:
      return (collection as Record<string, unknown>)[key as string];
    case typeMap:
      return (collection as Map<unknown, unknown>).get(key);
    case typeSet:
      // NOTE: Set.prototype.keys is alias of Set.prototype.values. It means key equals to value.
      return key;
    default:
  }
}

/**
 * set value to collection
 *
 * @param collection
 * @param key
 * @param value
 * @param collectionType
 */
export function setValue(
  collection: Collection,
  key: unknown,
  value: unknown,
  collectionType: string
): Collection {
  switch (collectionType) {
    case typeArguments:
    case typeArray:
    case typeObject:
      (collection as Record<string, unknown>)[key as string] = value;
      break;
    case typeMap:
      (collection as Map<unknown, unknown>).set(key, value);
      break;
    case typeSet:
      (collection as Set<unknown>).add(value);
      break;
    default:
  }

  return collection;
}
