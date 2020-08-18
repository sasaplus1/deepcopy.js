"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detector_1 = require("./detector");
const collection_1 = require("./collection");
const clone_1 = require("./clone");
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
function recursiveCopy(value, clone, references, visited, customizer) {
    const valueType = detector_1.detectType(value);
    const copiedValue = clone_1.copy(value, valueType);
    // return if not a collection value
    if (!collection_1.isCollection(valueType)) {
        return copiedValue;
    }
    const keys = /*#__INLINE__*/ collection_1.getKeys(value, valueType);
    // walk within collection with iterator
    for (const collectionKey of keys) {
        const collectionValue = /*#__INLINE__*/ collection_1.getValue(value, collectionKey, valueType);
        if (visited.has(collectionValue)) {
            // for [Circular]
            collection_1.setValue(clone, collectionKey, references.get(collectionValue), valueType);
        }
        else {
            const collectionValueType = detector_1.detectType(collectionValue);
            const copiedCollectionValue = clone_1.copy(collectionValue, collectionValueType);
            // save reference if value is collection
            if (collection_1.isCollection(collectionValueType)) {
                references.set(collectionValue, copiedCollectionValue);
                visited.add(collectionValue);
            }
            collection_1.setValue(clone, collectionKey, recursiveCopy(collectionValue, copiedCollectionValue, references, visited, customizer), valueType);
        }
    }
    // TODO: isSealed/isFrozen/isExtensible
    return clone;
}
/**
 * deep copy value
 *
 * @param value
 * @param options
 */
function deepcopy(value, options) {
    const { 
    // TODO: before/after customizer
    customizer = null
    // TODO: max depth
    // depth = Infinity,
     } = options || {};
    const valueType = detector_1.detectType(value);
    if (!collection_1.isCollection(valueType)) {
        return clone_1.copy(value, valueType, customizer);
    }
    const copiedValue = clone_1.copy(value, valueType, customizer);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const references = new WeakMap([
        [value, copiedValue]
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const visited = new WeakSet([value]);
    return recursiveCopy(value, copiedValue, references, visited, customizer);
}
exports.deepcopy = deepcopy;
//# sourceMappingURL=index.js.map