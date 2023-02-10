import { EARTH_MINUTE } from "../mod.ts";

export type ClockService = typeof getClockState;

/**
 * ClockState is the state of the clock at a given time.
 */
export interface ClockState {
  /**
   * Timestamp in milliseconds since the epoch of the last day start.
   */
  start: number;

  /** Milliseconds since the epoch. */
  ms: number;

  /** Timezone offset in milliseconds. */
  timezoneOffset: number;
}

/**
 * getClockState returns the current state of the clock.
 */
export function getClockState(): ClockState {
  const date = new Date();
  const ms = date.getTime();
  const start = new Date(ms).setHours(0, 0, 0, 0);
  const timezoneOffset = date.getTimezoneOffset() * EARTH_MINUTE;
  return { start, ms, timezoneOffset };
}
