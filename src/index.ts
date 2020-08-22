import { detectType } from './detector';
import {
  Collection,
  getKeys,
  getValue,
  isCollection,
  setValue
} from './collection';
import { copy, Customizer } from './clone';

/**
 * recursively copy
 *
 * @private
 * @param value
 * @param clone
 * @param references
 * @param visited
 * @param customizer
 */
function recursiveCopy(
  value: unknown,
  clone: unknown,
  references: WeakMap<Record<string, unknown>, unknown>,
  visited: WeakSet<Record<string, unknown>>,
  customizer: Parameters<typeof copy>[2]
): unknown {
  const valueType = detectType(value);
  const copiedValue = copy(value, valueType);

  // return if not a collection value
  if (!isCollection(valueType)) {
    return copiedValue;
  }

  const keys = /*#__INLINE__*/ getKeys(value as Collection, valueType);

  // walk within collection with iterator
  for (const collectionKey of keys) {
    const collectionValue = /*#__INLINE__*/ getValue(
      value as Collection,
      collectionKey,
      valueType
    ) as Record<string, unknown>;

    if (visited.has(collectionValue)) {
      // for [Circular]
      setValue(
        clone as Collection,
        collectionKey,
        references.get(collectionValue),
        valueType
      );
    } else {
      const collectionValueType = detectType(collectionValue);
      const copiedCollectionValue = copy(collectionValue, collectionValueType);

      // save reference if value is collection
      if (isCollection(collectionValueType)) {
        references.set(collectionValue, copiedCollectionValue);
        visited.add(collectionValue);
      }

      setValue(
        clone as Collection,
        collectionKey,
        recursiveCopy(
          collectionValue,
          copiedCollectionValue,
          references,
          visited,
          customizer
        ),
        valueType
      );
    }
  }

  // TODO: isSealed/isFrozen/isExtensible

  return clone;
}

export type Options = { customizer?: Customizer };

/**
 * deep copy value
 *
 * @param value
 * @param options
 */
export function deepcopy<T>(value: T, options?: Options): T {
  const {
    // TODO: before/after customizer
    customizer = null
    // TODO: max depth
    // depth = Infinity,
  } = options || {};

  const valueType = detectType(value);

  if (!isCollection(valueType)) {
    return copy(value, valueType, customizer) as T;
  }

  const copiedValue = copy(value, valueType, customizer);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const references = new WeakMap<Record<string, any>, unknown>([
    [value, copiedValue]
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const visited = new WeakSet<Record<string, any>>([value]);

  return recursiveCopy(
    value,
    copiedValue,
    references,
    visited,
    customizer
  ) as T;
}
