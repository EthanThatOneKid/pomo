import { assertEquals } from "./dev_deps.ts";

import { Pomo } from "./pomo.ts";
import { PomoCollection } from "./pomo_collection.ts";
import { DAY, MINUTE } from "./duration.ts";

Deno.test("PomoCollection returns correct timings", () => {
  const REF = 0;
  const pomo1 = Pomo.fromPattern({
    pattern: "25w5b",
    dayLength: DAY,
    ref: REF,
    scale: MINUTE,
  });
  const pomo2 = Pomo.fromPattern({
    pattern: "50w10b",
    dayLength: DAY,
    ref: REF,
    scale: MINUTE,
  });
  const collection = new PomoCollection([pomo1, pomo2]);
  const timings = collection.timings(30 * MINUTE + REF);
  assertEquals(timings, [
    {
      periods: [
        { index: 1, timeout: 25 * MINUTE },
        { index: 0, timeout: 30 * MINUTE },
      ],
      interval: 30 * MINUTE,
    },
    {
      periods: [
        { index: 1, timeout: 20 * MINUTE },
        { index: 0, timeout: 30 * MINUTE },
      ],
      interval: 60 * MINUTE,
    },
  ]);
});
