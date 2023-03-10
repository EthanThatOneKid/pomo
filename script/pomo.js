"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomoStamp = exports.Pomo = void 0;
const cycle_js_1 = require("./cycle.js");
const pattern_js_1 = require("./pattern.js");
/**
 * A Pomo is a cycle of work and break periods.
 */
class Pomo {
    constructor(
    /**
     * The cycle of the pomo.
     *
     * Such that the odd periods are work periods and the even periods are
     * break periods.
     */
    cycle, 
    /** The length of a day in the same unit as the cycle. */
    dayLength, 
    /** The number for the cycle to reference. */
    ref) {
        Object.defineProperty(this, "cycle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cycle
        });
        Object.defineProperty(this, "dayLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: dayLength
        });
        Object.defineProperty(this, "ref", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ref
        });
    }
    /** Whether or not the pomo is eternal. */
    get eternal() {
        return this.cycle.periods.length % 2 === 0 &&
            this.dayLength % this.cycle.total === 0;
    }
    /** The stamp at the given number. */
    at(n) {
        return new PomoStamp(this, n);
    }
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
    static fromPattern(options) {
        const periods = (0, pattern_js_1.parsePattern)(options.pattern, options.scale ?? 1);
        const cycle = new cycle_js_1.Cycle(periods);
        return new Pomo(cycle, options.dayLength, options.ref);
    }
}
exports.Pomo = Pomo;
/**
 * A PomoStamp is a stamp of a pomo at a given number.
 */
class PomoStamp {
    constructor(pomo, n) {
        Object.defineProperty(this, "pomo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pomo
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: n
        });
        /** The amount of elapsed values. */
        Object.defineProperty(this, "elapsed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The amount of elapsed cycles.
         *
         * Such that the amount of elapsed periods is equal to:
         * cycle * this.pomo.cycle.total + remainder
         */
        Object.defineProperty(this, "cycle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The amount of elapsed periods. */
        Object.defineProperty(this, "remainder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The index of the period in the cycle. */
        Object.defineProperty(this, "period", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.elapsed = n - pomo.ref;
        this.cycle = Math.trunc(this.elapsed / pomo.cycle.total);
        this.remainder = this.elapsed % pomo.cycle.total;
        this.period = pomo.cycle.at(this.n);
    }
    /** Whether or not the period is a work period. */
    get work() {
        return this.period % 2 === 0;
    }
    /** The number remaining until the next period. */
    get timeout() {
        return this.pomo.cycle.data[this.period + 1] - this.remainder;
    }
    /** The duration of the period. */
    get duration() {
        return this.pomo.cycle.periods[this.period];
    }
    /** The start of the period. */
    get start() {
        return this.n - this.remainder +
            this.pomo.cycle.data[this.period];
    }
    /** The end of the period. */
    get end() {
        return this.start + this.duration;
    }
    get timing() {
        const timing = makeTiming(this.pomo.cycle.total);
        let timeout = this.timeout;
        let index = this.pomo.cycle.next(this.period);
        for (let i = 0; i < this.pomo.cycle.periods.length; i++) {
            timing.periods.push({ index, timeout });
            timeout += this.pomo.cycle.periods[index];
            index = this.pomo.cycle.next(index);
        }
        timing.periods = timing.periods.sort((a, b) => a.timeout - b.timeout);
        return timing;
    }
}
exports.PomoStamp = PomoStamp;
function makeTiming(interval) {
    return { periods: [], interval };
}
