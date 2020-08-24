// NOTE: process.env.NODEJS is used for minifying code,
// It must replace to immediate value before minifying.
const isBufferExists = process.env.NODEJS && typeof Buffer !== 'undefined';

/**
 * is it Buffer?
 *
 * @private
 */
export const isBuffer: typeof Buffer.isBuffer = isBufferExists
  ? Buffer.isBuffer.bind(Buffer)
  : /**
     * return false every time if Buffer unsupported
     *
     * @private
     */
    function isBuffer(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      obj: Parameters<typeof Buffer.isBuffer>[0]
    ): obj is Buffer {
      return false;
    };

/**
 * clone Buffer
 *
 * @private
 */
export const cloneBuffer: typeof Buffer.from = isBufferExists
  ? Buffer.from.bind(Buffer)
  : /**
     * return argument
     * use if Buffer unsupported
     *
     * @private
     * @param value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function cloneBuffer(value: unknown): any {
      return value;
    };
