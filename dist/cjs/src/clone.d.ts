/**
 * clone value
 *
 * @private
 * @param value
 * @param valueType
 */
export declare function clone(value: unknown, valueType: string): unknown;
export declare type Customizer = (value: unknown, type: string) => unknown;
/**
 * copy value with customizer function
 *
 * @private
 * @param value
 * @param type
 */
export declare function copy(value: unknown, valueType: string, customizer?: Customizer | null): unknown;
