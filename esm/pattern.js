/**
 * parsePattern parses a string of numbers separated by non-digits.
 *
 * Example pattern:
 * "25w5b25w5b25w25b10"
 */
export function parsePattern(pattern, scale) {
    return pattern
        .split(/\D+/)
        .filter(hasLength)
        .map((n) => Number(n) * scale)
        .filter(isNaNInverse);
}
function hasLength({ length }) {
    return length > 0;
}
function isNaNInverse(n) {
    return !Number.isNaN(n);
}
