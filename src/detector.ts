import typeDetect from 'type-detect';

import { isBuffer } from './buffer';

// NOTE: for the file size optimization
export const typeArguments = 'Arguments';
export const typeArray = 'Array';
export const typeObject = 'Object';
export const typeMap = 'Map';
export const typeSet = 'Set';

/**
 * detect value type
 *
 * @param value
 */
export function detectType(value: unknown): string {
  // NOTE: isBuffer must execute before type-detect,
  // because type-detect returns 'Uint8Array'.
  if (/*#__INLINE__*/ isBuffer(value)) {
    return 'Buffer';
  }

  return typeDetect(value);
}
