import { Cycle } from "./cycle.ts";
import { parsePattern } from "./pattern.ts";
import type { PatternOptions } from "./pattern.ts";

/**
 * A Pomo is a cycle of work and break periods.
 */
export class Pomo {
  constructor(
    /**
     * The cycle of the pomo.
     *
     * Such that the odd periods are work periods and the even periods are
     * break periods.
     */
    public readonly cycle: Cycle,
    /** The length of a day in the same unit as the cycle. */
    public readonly dayLength: number,
    /** The number for the cycle to reference. */
    public readonly ref: number,
  ) {}

  /** Whether or not the pomo is eternal. */
  public get eternal(): boolean {
    return this.cycle.periods.length % 2 === 0 &&
      this.dayLength % this.cycle.total === 0;
  }

  /** The stamp at the given number. */
  public at(n: number): PomoStamp {
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
  public static fromPattern(options: PatternOptions): Pomo {
    const periods = parsePattern(options.pattern, options.scale ?? 1);
    const cycle = new Cycle(periods);
    return new Pomo(cycle, options.dayLength, options.ref);
  }
}

/**
 * A PomoStamp is a stamp of a pomo at a given number.
 */
export class PomoStamp {
  /** The amount of elapsed values. */
  public readonly elapsed: number;

  /**
   * The amount of elapsed cycles.
   *
   * Such that the amount of elapsed periods is equal to:
   * cycle * this.pomo.cycle.total + remainder
   */
  public readonly cycle: number;

  /** The amount of elapsed periods. */
  public readonly remainder: number;

  /** The index of the period in the cycle. */
  public readonly index: number;

  constructor(
    public readonly pomo: Pomo,
    public readonly n: number,
  ) {
    this.elapsed = n - pomo.ref;
    this.cycle = Math.trunc(this.elapsed / pomo.cycle.total);
    this.remainder = this.elapsed % pomo.cycle.total;
    this.index = pomo.cycle.at(this.n);
  }

  /** Whether or not the period is a work period. */
  public get work(): boolean {
    return this.index % 2 === 0;
  }

  /** The number remaining until the next period. */
  public get timeout(): number {
    return this.pomo.cycle.data[this.index + 1] - this.remainder;
  }

  /** The duration of the period. */
  public get duration(): number {
    return this.pomo.cycle.periods[this.index];
  }

  /** The start of the period. */
  public get start(): number {
    return this.n - this.remainder +
      this.pomo.cycle.data[this.index];
  }

  /** The end of the period. */
  public get end(): number {
    return this.start + this.duration;
  }
}
