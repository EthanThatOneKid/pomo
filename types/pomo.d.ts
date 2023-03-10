import { Cycle } from "./cycle.js";
import type { PatternOptions } from "./pattern.js";
/**
 * A Pomo is a cycle of work and break periods.
 */
export declare class Pomo {
    /**
     * The cycle of the pomo.
     *
     * Such that the odd periods are work periods and the even periods are
     * break periods.
     */
    readonly cycle: Cycle;
    /** The length of a day in the same unit as the cycle. */
    readonly dayLength: number;
    /** The number for the cycle to reference. */
    readonly ref: number;
    constructor(
    /**
     * The cycle of the pomo.
     *
     * Such that the odd periods are work periods and the even periods are
     * break periods.
     */
    cycle: Cycle, 
    /** The length of a day in the same unit as the cycle. */
    dayLength: number, 
    /** The number for the cycle to reference. */
    ref: number);
    /** Whether or not the pomo is eternal. */
    get eternal(): boolean;
    /** The stamp at the given number. */
    at(n: number): PomoStamp;
    /**
     * Create a pomo from a pattern.
     *
     * Example:
     * ```ts
     * // Options for creating a pomo from a pattern
     * const pattern = "25w5b"; // 25 minutes of work, 5 minutes of break
     * const dayLength = DAY; // 1 day in milliseconds
     * const ref = new Date(new Date().setHours(0, 0, 0, 0)).valueOf(); // Previous midnight
     * const scale = MINUTE; // Scale minutes in pattern to milliseconds
     *
     * const pomo = Pomo.fromPattern({
     *   pattern, // required
     *   dayLength, // required
     *   ref, // required
     *   scale, // default = 1
     * });
     *
     * const stamp = pomo.at(new Date().valueOf());
     * console.log(format(stamp.timeout, "HH:mm:ss.SSS"));
     * ```
     */
    static fromPattern(options: PatternOptions): Pomo;
}
/**
 * A PomoStamp is a stamp of a pomo at a given number.
 */
export declare class PomoStamp {
    readonly pomo: Pomo;
    readonly n: number;
    /** The amount of elapsed values. */
    readonly elapsed: number;
    /**
     * The amount of elapsed cycles.
     *
     * Such that the amount of elapsed periods is equal to:
     * cycle * this.pomo.cycle.total + remainder
     */
    readonly cycle: number;
    /** The amount of elapsed periods. */
    readonly remainder: number;
    /** The index of the period in the cycle. */
    readonly period: number;
    constructor(pomo: Pomo, n: number);
    /** Whether or not the period is a work period. */
    get work(): boolean;
    /** The number remaining until the next period. */
    get timeout(): number;
    /** The duration of the period. */
    get duration(): number;
    /** The start of the period. */
    get start(): number;
    /** The end of the period. */
    get end(): number;
    get timing(): Timing;
}
/**
 * A timing is a set of periods and an interval.
 */
export interface Timing {
    periods: {
        index: number;
        timeout: number;
    }[];
    interval: number;
}
