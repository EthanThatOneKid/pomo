import { Cycle, Pomo } from "../mod.ts";

import type { ClockState } from "./clock_service.ts";

export interface DoPomoOptions {
  /** The pattern of the pomo. */
  patterns: number[][];

  /** The function to call when a pomo is triggered. */
  fn: (pomo: Pomo) => void;

  /** The function to call to get the current state of the clock. */
  clock: () => ClockState;
}

/** A function that returns the current state of the clock. */
export function doPomo(options: DoPomoOptions) {
  const state = options.clock();
  const pomos = fromPatterns(options.patterns, state);
  const nextPomos = getNextPomos(pomos, state);
  if (nextPomos.length === 0) {
    return;
  }

  const { until } = nextPomos[0].at(state.ms);
  setTimeout(() => {
    nextPomos.forEach(options.fn);

    // Instead of calling the function recursively, use setTimeout.
    setTimeout(() => doPomo(options), 0);
  }, until);
}

// Find the pomos with the next period.
function getNextPomos(pomos: Pomo[], state: ClockState): Pomo[] {
  let recordUntil = Infinity;
  let nextPomos: Pomo[] = [];
  for (let i = 0; i < pomos.length; i++) {
    const pomo = pomos[i];
    const stamp = pomo.at(state.ms);
    if (stamp.until < recordUntil) {
      recordUntil = stamp.until;
      nextPomos = [pomo];
    } else if (stamp.until === recordUntil) {
      nextPomos.push(pomo);
    }
  }
  return nextPomos;
}

const DAY = 1 * 24 * 60 * 60 * 1e3; // 1 Earth day in milliseconds

function fromPatterns(patterns: number[][], state: ClockState): Pomo[] {
  return patterns.map((pattern) =>
    new Pomo(new Cycle(pattern), DAY, state.start)
  );
}
