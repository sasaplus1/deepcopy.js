import { Customizer } from './clone';
export declare type Options = {
    customizer?: Customizer;
};
/**
 * deep copy value
 *
 * @param value
 * @param options
 */
export declare function deepcopy<T>(value: T, options?: Options): T;
