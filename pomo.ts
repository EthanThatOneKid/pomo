import { Cycle } from "./cycle.ts";

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

  /** The index of the previous period in the cycle. */
  public readonly previousIndex: number;

  constructor(
    public readonly pomo: Pomo,
    public readonly n: number,
  ) {
    this.elapsed = n - pomo.ref;
    this.cycle = Math.trunc(this.elapsed / pomo.cycle.total);
    this.remainder = this.elapsed % pomo.cycle.total;
    this.index = pomo.cycle.at(this.n);
    this.previousIndex = pomo.cycle.next(this.index, -1);
  }

  /** Whether or not the period is a work period. */
  public get work(): boolean {
    return this.index % 2 === 0;
  }

  /** The number remaining until the next period. */
  public get until(): number {
    return this.duration - this.remainder;
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

  public at(n: number): PomoStamp {
    return new PomoStamp(this, n);
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
 * "25w5b25w5b25w25b10"
 */
export function parsePattern(pattern: string): number[] {
  return pattern
    .split(/\D+/)
    .filter(hasLength)
    .map(Number)
    .filter(isNaNInverse);
}

function hasLength({ length }: { length: number }): boolean {
  return length > 0;
}

function isNaNInverse(n: number): boolean {
  return !Number.isNaN(n);
}