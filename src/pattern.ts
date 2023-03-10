/** Options for creating a pattern. */
export interface PatternOptions {
  pattern: string;
  dayLength: number;
  ref: number;
  scale?: number;
}

/**
 * parsePattern parses a string of numbers separated by non-digits.
 *
 * Example pattern:
 * "25w5b25w5b25w25b10"
 */
export function parsePattern(pattern: string, scale: number): number[] {
  return pattern
    .split(/\D+/)
    .filter(hasLength)
    .map((n) => Number(n) * scale)
    .filter(isNaNInverse);
}

function hasLength({ length }: { length: number }): boolean {
  return length > 0;
}

function isNaNInverse(n: number): boolean {
  return !Number.isNaN(n);
}
