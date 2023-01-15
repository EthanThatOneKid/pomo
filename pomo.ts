import { Cycle } from "./cycle.ts";

export interface PeriodData {
  /** The index of the period. */
  index: number;

  /** Whether or not the period is a work period. */
  work: boolean;

  /**
   * The amount of elapsed cycles.
   *
   * Such that the amount of elapsed periods is equal to:
   * elapsed * cycle.total + period
   */
  cycle: number;

  /** The number remaining until the next period. */
  until: number;

  /** The value of the period. */
  value: number;

  /** The start of the period. */
  start: number;

  /** The end of the period. */
  end: number;
}

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

  public get infinite(): boolean {
    return this.cycle.periods.length % 2 === 0 &&
      this.dayLength % this.cycle.total === 0;
  }

  public at(n: number): PeriodData {
    const elapsed = n - this.ref;
    const cycle = Math.trunc(elapsed / this.cycle.total);
    const remainder = elapsed % this.cycle.total;
    const index = this.cycle.at(elapsed);
    const work = index % 2 === 0;
    const value = this.cycle.periods[index];
    const nextIndex = this.cycle.next(index);
    const until = this.cycle.data[nextIndex] - remainder;
    const start = this.cycle.data[index] + (cycle * this.cycle.total) +
      this.ref;
    const end = start + value;

    return {
      index,
      work,
      cycle,
      until,
      value,
      start,
      end,
    };
  }

  public static fromPattern(
    pattern: string,
    dayLength: number,
    ref: number,
  ): Pomo {
    const periods = parsePattern(pattern);
    const cycle = new Cycle(periods);
    return new Pomo(cycle, dayLength, ref);
  }
}

/**
 * parsePattern parses a string of numbers separated by non-digits.
 *
 * Example pattern:
 * "w25b5w25b5w25b10"
 */
export function parsePattern(pattern: string): number[] {
  return pattern
    .split(/\D+/)
    .map(Number)
    .filter(Number.isNaN);
}
