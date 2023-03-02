import type { PomoStamp, Timing } from "./pomo.ts";
import { Pomo } from "./pomo.ts";
import { DAY, MINUTE } from "./duration.ts";

export class PomoCollection {
  constructor(
    public readonly data: Pomo[] = [],
  ) {}

  public at(n: number): PomoStamp[] {
    return this.data.map((pomo) => pomo.at(n));
  }

  public timings(n: number): Timing[] {
    return PomoCollection.timingsOf(this.at(n));
  }

  public static timingsOf(stamps: PomoStamp[]): Timing[] {
    return stamps.map((stamp) => stamp.timing);
  }

  public static fromString(
    patterns: string,
    ref: number,
  ): PomoCollection {
    return new PomoCollection(
      patterns
        .split(";")
        .filter(Boolean)
        .map((pattern) =>
          Pomo.fromPattern({
            pattern,
            ref,
            dayLength: DAY,
            scale: MINUTE,
          })
        ),
    );
  }
}
