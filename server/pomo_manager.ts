import { Cycle, EARTH_DAY, Pomo } from "../mod.ts";

import type { ClockService, ClockState } from "./clock_service.ts";

/**
 * PomoHandler is the function to call when a pomo is triggered.
 */
type PomoHandler = (pomo: Pomo) => void;

/**
 * PomoManagerOptions are the options for the PomoManager.
 */
export interface PomoManagerOptions {
  /** The pattern of the pomo. */
  patterns: number[][];

  /** The function to call when a pomo is triggered. */
  handler: PomoHandler;

  /** The function to call to get the current state of the clock. */
  clock: ClockService;

  /** Initial clock state. */
  state: ClockState;
}

export class PomoManager {
  public readonly pomos: Pomo[];
  private sortedPomoGroups: Pomo[][];

  constructor(
    public readonly options: PomoManagerOptions,
  ) {
    this.pomos = fromPatterns(this.options.patterns, this.options.state);
    this.sortedPomoGroups = groupPomosByTime(this.pomos, this.options.state.ms);
  }

  /**
   * setInterval sets the interval to trigger the next pomo and returns the timeout ID.
   *
   * If there are no more pomos to trigger, then undefined is returned.
   *
   * Use `clearTimeout` to stop the interval.
   */
  public setInterval(): number | undefined {
    const state = this.options.clock();
    const nextPomoGroups = this.nextPomoGroups(state);
    if (nextPomoGroups.length === 0) {
      return;
    }

    const { timeout } = nextPomoGroups[0][0].at(state.ms);
    let timeoutID = setTimeout(() => {
      nextPomoGroups.forEach((pomoGroup) =>
        pomoGroup.forEach(this.options.handler)
      );

      // Instead of calling the function recursively, use setTimeout.
      timeoutID = setTimeout(() => this.setInterval(), 0);
    }, timeout);

    return timeoutID;
  }

  /**
   * nextPomoGroups returns the next pomo groups to trigger, grouped by matching _until_ time.
   *
   * If distance === 0, then the next pomo is returned.
   * If distance === 1, then the pomo after the next pomo is returned as well as the next pomo.
   * If distance === 2, then the next 3 pomos are returned.
   * If distance === -2, then the current and previous pomos are returned.
   */
  public nextPomoGroups(from: ClockState, distance = 0): Pomo[][] {
    let earliest = Number.MAX_SAFE_INTEGER;
    let count = 0;
    const result: Pomo[][] = [];

    for (const pomoGroup of this.sortedPomoGroups) {
      const stamp = pomoGroup[0].at(from.ms);
      if (stamp.timeout < earliest) {
        earliest = stamp.timeout;
        result.splice(0, result.length, pomoGroup);
        count = 1;
      } else if (stamp.timeout === earliest) {
        result.push(pomoGroup);
        count++;
      }

      if (count === Math.abs(distance) + 1) {
        break;
      }
    }

    if (distance < 0) {
      return result.reverse();
    }

    return result;
  }
}

/**
 * fromPatterns returns a list of pomos from a list of patterns.
 */
function fromPatterns(patterns: number[][], { start }: ClockState): Pomo[] {
  return patterns.map((pattern) =>
    new Pomo(new Cycle(pattern), EARTH_DAY, start)
  );
}

/**
 * groupPomosByTime groups the pomos based on their next timeout.
 */
function groupPomosByTime(pomos: Pomo[], n: number): Pomo[][] {
  const groups: Map<number, Pomo[]> = new Map();
  for (const pomo of pomos) {
    const stamp = pomo.at(n);
    const until = stamp.timeout;
    if (!groups.has(until)) {
      groups.set(until, []);
    }
    groups.get(until)!.push(pomo);
  }
  return Array.from(groups.values());
}
