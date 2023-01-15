import { assertEquals } from "./test_deps.ts";

import { Cycle } from "./cycle.ts";
import { Pomo } from "./pomo.ts";

Deno.test("pomo - at", () => {
  const cycle = new Cycle([25, 5]);
  const pomo = new Pomo(cycle, 1440, 0);
  const period = pomo.at(35);

  assertEquals(period.index, 1);
  assertEquals(period.work, false);
  assertEquals(period.cycle, 1);
  assertEquals(period.until, 5);
  assertEquals(period.value, 5);
  assertEquals(period.start, 30);
  assertEquals(period.end, 35);
});

Deno.test("pomo - infinite", () => {
  const cycle = new Cycle([25]);
  const pomo = new Pomo(cycle, 100, 0);
  assertEquals(pomo.infinite, true);
});

Deno.test("pomo - infinite (false)", () => {
  const cycle = new Cycle([11]);
  const pomo = new Pomo(cycle, 100, 0);
  assertEquals(pomo.infinite, false);
});
