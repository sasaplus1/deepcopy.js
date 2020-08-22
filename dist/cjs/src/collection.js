"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detector_1 = require("./detector");
/**
 * Collection types
 *
 * @private
 */
const collectionTypeSet = new Set([
    detector_1.typeArguments,
    detector_1.typeArray,
    detector_1.typeMap,
    detector_1.typeObject,
    detector_1.typeSet
]);
/**
 * is it Collection?
 *
 * @private
 * @param valueType
 */
function isCollection(valueType) {
    return /*#__INLINE__*/ collectionTypeSet.has(valueType);
}
exports.isCollection = isCollection;
/**
 * get keys from Collection
 *
 * @private
 * @param collection
 * @param collectionType
 */
function getKeys(collection, collectionType) {
    switch (collectionType) {
        case detector_1.typeArguments:
        case detector_1.typeArray:
            return Object.keys(collection);
        case detector_1.typeObject:
            return [].concat(
            // NOTE: Object.getOwnPropertyNames can get all own keys.
            Object.keys(collection), Object.getOwnPropertySymbols(collection));
        case detector_1.typeMap:
        case detector_1.typeSet:
            return Array.from(collection.keys());
        default:
            return [];
    }
}
exports.getKeys = getKeys;
/**
 * get value from Collection
 *
 * @private
 * @param collection
 * @param key
 * @param collectionType
 */
function getValue(collection, key, collectionType) {
    switch (collectionType) {
        case detector_1.typeArguments:
        case detector_1.typeArray:
        case detector_1.typeObject:
            return collection[key];
        case detector_1.typeMap:
            return collection.get(key);
        case detector_1.typeSet:
            // NOTE: Set.prototype.keys is alias of Set.prototype.values. It means key equals to value.
            return key;
        default:
    }
}
exports.getValue = getValue;
/**
 * set value to collection
 *
 * @param collection
 * @param key
 * @param value
 * @param collectionType
 */
function setValue(collection, key, value, collectionType) {
    switch (collectionType) {
        case detector_1.typeArguments:
        case detector_1.typeArray:
        case detector_1.typeObject:
            collection[key] = value;
            break;
        case detector_1.typeMap:
            collection.set(key, value);
            break;
        case detector_1.typeSet:
            collection.add(value);
            break;
        default:
    }
    return collection;
}
exports.setValue = setValue;
//# sourceMappingURL=collection.js.map