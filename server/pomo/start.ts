import type { Timing } from "../../mod.ts";
import { DAY, MINUTE, Pomo } from "../../mod.ts";

export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;

export function start(
  timing: Timing,
  fn: (i: number) => void,
  setTimeoutFn = setTimeout,
  setIntervalFn = setInterval,
): Array<Timeout | Interval> {
  const ids: number[] = [];
  for (const period of timing.periods) {
    const id = setTimeoutFn(() => {
      fn(period.index);
      ids.push(setIntervalFn(() => fn(period.index), timing.interval));
    }, period.timeout);
    ids.push(id);
  }
  return ids;
}

export function cancel(ids: Array<Timeout | Interval>) {
  for (const id of ids) {
    clearTimeout(id);
    clearInterval(id);
  }
}

export function timingsFromPatterns(
  patterns: string[],
  timestamp = new Date().getTime(),
): Timing[] {
  const ref = new Date(timestamp).setHours(0, 0, 0, 0);
  const dayLength = DAY;
  const scale = MINUTE;
  return patterns.map((pattern) => {
    const pomo = Pomo.fromPattern({ pattern, dayLength, scale, ref });
    return pomo.at(timestamp).timing;
  });
}
