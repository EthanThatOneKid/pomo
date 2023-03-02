import type { PomoStamp, Timing } from "./pomo.ts";
import { Pomo } from "./pomo.ts";
import { DAY, MINUTE } from "./duration.ts";

export class PomoCollection<Key extends string = string> {
  constructor(
    public readonly data: Record<Key, Pomo> = {} as Record<Key, Pomo>,
  ) {}

  public at(n: number): Array<[Key, PomoStamp]> {
    return Object.entries<Pomo>(this.data).map(([key, pomo]) => [
      key,
      pomo.at(n),
    ]) as Array<[Key, PomoStamp]>;
  }

  public timings(n: number): Array<[Key, Timing]> {
    return this.at(n).map(([key, stamp]) => [key, stamp.timing]);
  }

  public static fromString(
    patterns: string,
    ref: number,
  ): PomoCollection {
    return new PomoCollection(
      patterns
        .split(";")
        .reduce((data, pair) => {
          const { 0: key, 1: pattern } = pair.split(":").map((s) => s.trim());
          if (key !== undefined && pattern !== undefined) {
            data[key] = Pomo.fromPattern({
              pattern,
              ref,
              dayLength: DAY,
              scale: MINUTE,
            });
          }
          return data;
        }, {} as Record<string, Pomo>),
    );
  }
}
