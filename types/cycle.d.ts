/**
 * A Cycle is an array of numbers that repeat indefinitely.
 */
export declare class Cycle {
    readonly periods: number[];
    readonly data: number[];
    readonly total: number;
    constructor(periods: number[]);
    /**
     * Given a number, return the index of the period that
     * contains that time inclusive of the start of the
     * period and exclusive of the end of the period
     * (i.e. the period is [start, end)).
     *
     * This method uses a Binary Search algorithm.
     */
    at(n: number): number;
    /**
     * Given a number, return the index of the period that
     * contains that time inclusive of the start of the
     * period and exclusive of the end of the period
     * (i.e. the period is [start, end)).
     */
    next(i: number, count?: number): number;
}
