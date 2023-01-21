import { assertEquals } from "./dev_deps.ts";
import { Pomo } from "./pomo.ts";
import { Cycle } from "./cycle.ts";

const TEST_CYCLE = new Cycle([5, 5, 5, 5]);
const TEST_POMO = new Pomo(TEST_CYCLE, 100, 0);

Deno.test("PomoStamp.work", () => {
  const stamp1 = TEST_POMO.at(1);
  const stamp2 = TEST_POMO.at(6);
  const stamp3 = TEST_POMO.at(11);
  const stamp4 = TEST_POMO.at(16);

  assertEquals(stamp1.work, true);
  assertEquals(stamp2.work, false);
  assertEquals(stamp3.work, true);
  assertEquals(stamp4.work, false);
});

Deno.test("PomoStamp.until", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.until, 4);
});

Deno.test("PomoStamp.duration", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.duration, 5);
});

Deno.test("PomoStamp.start", () => {
  const stamp = TEST_POMO.at(101);
  assertEquals(stamp.start, 100);
});

Deno.test("PomoStamp.end", () => {
  const stamp = TEST_POMO.at(104);
  assertEquals(stamp.end, 105);
});

Deno.test("PomoStamp.end (2)", () => {
  const stamp = TEST_POMO.at(106);
  assertEquals(stamp.end, 110);
});

Deno.test("Pomo.infinite", () => {
  assertEquals(TEST_POMO.infinite, true);
});

Deno.test("Pomo.fromPattern", () => {
  const dayLength = 60 * 24;
  const pomo = Pomo.fromPattern("25w5b25w5b25w10b", dayLength, 0);
  assertEquals(pomo.cycle.periods, [25, 5, 25, 5, 25, 10]);
});