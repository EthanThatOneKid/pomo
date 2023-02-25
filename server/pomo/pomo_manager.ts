import type { Duration } from "../../mod.ts";
import { Pomo } from "../../mod.ts";

export interface StartOptions<ID extends string> {
  timestamp: number;
  pomos: Record<ID, Pomo>;
}

export function start(o: StartOptions) {
  const timings = gatherTimings(o.pomos);
  let timeout = setTimeout(() => {
    const { ids, duration } = timings.timeout;
    for (const id of ids) {
      o.pomos[id].start(duration);
    }
    
    for (const { ids, duration } of timings.intervals) {
      for (const id of ids) {
        o.pomos[id].start(duration);
      }
    }
  }
}

export interface Timings<ID extends string> {
  // The IDs of the pomos that are next to timeout.
  timeout: {
    ids: ID[];
    duration: Duration;
  };
  // Once the timeout has elapsed, the next intervals will be triggered.
  intervals: {
    ids: ID[];
    duration: Duration;
  }[];
}
