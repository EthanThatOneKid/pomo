import type { Duration } from "./duration.ts";
import { DAY, MINUTE } from "./duration.ts";
import { Pomo } from "./pomo.ts";

export interface PeriodsOptions<PatternID extends string> {
  /**
   * The patterns to use for the timings.
   *
   * Example:
   * ```ts
   * const patterns = {
   *  short: "10 5 10 5 10 10",
   *  medium: "25 5 25 5 25 10",
   *  long: "50 10 50 10 50 20",
   * };
   * ```
   */
  patterns: Record<PatternID, string>;
  timestamp?: string;
}

export interface Period<PatternID extends string = string> {
  id: PatternID;
  interval: Duration;
  timeout: Duration;
  timestamp: string;
  elapsed: number;
  remainder: number;
  cycle: number;
  period: number;
  work: boolean;
  break: boolean;
  start: number;
  end: number;
  duration: Duration;
}

export function periods<PatternID extends string>(
  options: PeriodsOptions<PatternID>,
): Period<PatternID>[] {
  const date = options.timestamp ? new Date(options.timestamp) : new Date();
  const at = date.getTime();
  const dayStart = new Date(date).setHours(0, 0, 0, 0);

  const pomos = Object.entries<string>(options.patterns).map(
    ([id, pattern]) => {
      const pomo = Pomo.fromPattern({
        pattern,
        dayLength: DAY,
        scale: MINUTE,
        ref: dayStart,
      });
      return [id, pomo] as [PatternID, Pomo];
    },
  );

  const result: Period<PatternID>[] = [];
  for (const [id, pomo] of pomos) {
    const stamp = pomo.at(at);
    const interval = pomo.cycle.total;

    for (let i = 0; i < pomo.cycle.periods.length; i++) {
      const timeout = stamp.timeout +
        pomo.cycle.data[pomo.cycle.next(stamp.period, i)];
      result.push(makePeriod());
    }
  }

  //   const seen = new Map<string, PatternID[]>();
  //   for (const [id, pomo] of pomos) {
  //     const stamp = pomo.at(at);
  //     const duration = stamp.pomo.cycle.total;
  //     periods:
  //     for (let i = 0; i < pomo.cycle.periods.length; i++) {
  //       const timeout = stamp.timeout +
  //         pomo.cycle.data[pomo.cycle.next(stamp.index, i)];

  //       const stringified = `${duration}-${timeout}`;
  //       const ids = seen.get(stringified);
  //       if (ids !== undefined) {
  //         seen.set(stringified, ids.concat([id]));
  //         continue periods;
  //       }

  //       seen.set(stringified, [id]);
  //     }
  //   }

  //   return [...seen.entries()].map(([stringified, ids]) => {
  //     const [duration, timeout] = stringified.split("-").map(Number);
  //     return {
  //       ids,
  //       duration,
  //       timeout,
  //     };
  //   });
}
