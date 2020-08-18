"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_detect_1 = __importDefault(require("type-detect"));
const buffer_1 = require("./buffer");
// NOTE: for the file size optimization
exports.typeArguments = 'Arguments';
exports.typeArray = 'Array';
exports.typeObject = 'Object';
exports.typeMap = 'Map';
exports.typeSet = 'Set';
/**
 * detect value type
 *
 * @param value
 */
function detectType(value) {
    // NOTE: isBuffer must execute before type-detect,
    // because type-detect returns 'Uint8Array'.
    if ( /*#__INLINE__*/buffer_1.isBuffer(value)) {
        return 'Buffer';
    }
    return type_detect_1.default(value);
}
exports.detectType = detectType;
//# sourceMappingURL=detector.js.map