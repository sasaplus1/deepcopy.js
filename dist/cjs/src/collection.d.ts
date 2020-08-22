export declare type Collection = IArguments | Array<unknown> | Map<unknown, unknown> | Record<string | number | symbol, unknown> | Set<unknown>;
/**
 * is it Collection?
 *
 * @private
 * @param valueType
 */
export declare function isCollection(valueType: string): boolean;
/**
 * get keys from Collection
 *
 * @private
 * @param collection
 * @param collectionType
 */
export declare function getKeys(collection: Collection, collectionType: string): Array<string | symbol>;
/**
 * get value from Collection
 *
 * @private
 * @param collection
 * @param key
 * @param collectionType
 */
export declare function getValue(collection: Collection, key: unknown, collectionType: string): unknown;
/**
 * set value to collection
 *
 * @param collection
 * @param key
 * @param value
 * @param collectionType
 */
export declare function setValue(collection: Collection, key: unknown, value: unknown, collectionType: string): Collection;
