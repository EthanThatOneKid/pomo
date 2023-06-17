import * as dntShim from "./_dnt.test_shims.js";
import { assertEquals } from "./dev_deps.js";

import { PomoCollection } from "./pomo_collection.js";
import { MINUTE } from "./duration.js";

dntShim.Deno.test("PomoCollection.fromString returns correct PomoCollection", () => {
  const collection = PomoCollection.fromString("25-5:25w5b;50-10:50w10b", 0);
  assertEquals(Object.values(collection.data).length, 2);
  assertEquals(
    collection.data["25-5"].cycle.periods,
    [25 * MINUTE, 5 * MINUTE],
  );
  assertEquals(
    collection.data["50-10"].cycle.periods,
    [50 * MINUTE, 10 * MINUTE],
  );
});

dntShim.Deno.test("PomoCollection returns correct timings", () => {
  const REF = 0;
  const collection = PomoCollection.fromString("25-5:25w5b;50-10:50w10b", REF);
  const timings = collection.timings(30 * MINUTE + REF);
  assertEquals(timings, [
    ["25-5", {
      periods: [
        { index: 1, timeout: 25 * MINUTE },
        { index: 0, timeout: 30 * MINUTE },
      ],
      interval: 30 * MINUTE,
    }],
    ["50-10", {
      periods: [
        { index: 1, timeout: 20 * MINUTE },
        { index: 0, timeout: 30 * MINUTE },
      ],
      interval: 60 * MINUTE,
    }],
  ]);
});
