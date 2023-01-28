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
}

/**
 * getClockState returns the current state of the clock.
 */
export function getClockState(): ClockState {
  const ms = new Date().getTime();
  const start = new Date(ms).setHours(0, 0, 0, 0);
  return { start, ms };
}
