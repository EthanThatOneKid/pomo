import { assertEquals } from "./dev_deps.ts";

import { PomoCollection } from "./pomo_collection.ts";
import { MINUTE } from "./duration.ts";

Deno.test("PomoCollection.fromString returns correct PomoCollection", () => {
  const collection = PomoCollection.fromString("25w5b;50w10b", 0);
  assertEquals(collection.data.length, 2);
  assertEquals(collection.data[0].cycle.periods, [25 * MINUTE, 5 * MINUTE]);
  assertEquals(collection.data[1].cycle.periods, [50 * MINUTE, 10 * MINUTE]);
});

Deno.test("PomoCollection returns correct timings", () => {
  const REF = 0;
  const collection = PomoCollection.fromString("25w5b;50w10b", REF);
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
