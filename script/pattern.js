"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePattern = void 0;
/**
 * parsePattern parses a string of numbers separated by non-digits.
 *
 * Example pattern:
 * "25w5b25w5b25w25b10"
 */
function parsePattern(pattern, scale) {
    return pattern
        .split(/\D+/)
        .filter(hasLength)
        .map((n) => Number(n) * scale)
        .filter(isNaNInverse);
}
exports.parsePattern = parsePattern;
function hasLength({ length }) {
    return length > 0;
}
function isNaNInverse(n) {
    return !Number.isNaN(n);
}
