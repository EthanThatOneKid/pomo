export class Cycle {
  public readonly data: number[];
  public readonly total: number;

  constructor(
    public readonly periods: number[],
  ) {
    this.data = [0];
    this.total = 0;
    for (const period of periods) {
      this.total += period;
      this.data.push(this.total);
    }
  }

  /**
   * Given a number, return the index of the period that
   * contains that time inclusive of the start of the
   * period and exclusive of the end of the period
   * (i.e. the period is [start, end)).
   *
   * This method uses a Binary Search algorithm.
   */
  public at(n: number): number {
    if (n >= this.total) {
      n = n % this.total;
    }

    let lo = 0;
    let hi = this.data.length - 1;
    while (lo < hi) {
      const mid = Math.trunc((lo + hi) / 2);
      if (n < this.data[mid]) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    return this.next(lo, -1);
  }

  /**
   * Given a number, return the index of the period that
   * contains that time inclusive of the start of the
   * period and exclusive of the end of the period
   * (i.e. the period is [start, end)).
   */
  public next(i: number, count = 1): number {
    i = (i + count) % this.periods.length;
    if (i < 0) {
      return this.periods.length + i;
    }

    return i;
  }
}
