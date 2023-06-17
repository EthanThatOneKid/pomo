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
export declare function parsePattern(pattern: string, scale: number): number[];
