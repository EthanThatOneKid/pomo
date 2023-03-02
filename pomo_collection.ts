import type { PomoStamp, Timing } from "./pomo.ts";
import { Pomo } from "./pomo.ts";

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
}
