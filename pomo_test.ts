import { assertEquals } from "./dev_deps.ts";
import { Pomo } from "./pomo.ts";
import { Cycle } from "./cycle.ts";
import {
  DAY,
  format,
  MINUTE,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from "./duration.ts";

const TEST_DAY_LENGTH = 100;
const TEST_CYCLE = new Cycle([5, 5, 5, 5]);
const TEST_POMO = new Pomo(TEST_CYCLE, TEST_DAY_LENGTH, 0);

Deno.test("PomoStamp.elapsed", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.elapsed, 1);
});

Deno.test("PomoStamp.cycle", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.cycle, 0);
});

Deno.test("PomoStamp.cycle (2)", () => {
  const stamp = TEST_POMO.at(20);
  assertEquals(stamp.cycle, 1);
});

Deno.test("PomoStamp.remainder", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.remainder, 1);
});

Deno.test("PomoStamp.remainder (2)", () => {
  const stamp = TEST_POMO.at(21);
  assertEquals(stamp.remainder, 1);
});

Deno.test("PomoStamp.index", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.index, 0);
});

Deno.test("PomoStamp.index (2)", () => {
  const stamp = TEST_POMO.at(6);
  assertEquals(stamp.index, 1);
});

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

Deno.test("PomoStamp.timeout", () => {
  const stamp = TEST_POMO.at(1);
  assertEquals(stamp.timeout, 4);
});

Deno.test("PomoStamp.timeout (2)", () => {
  const stamp = TEST_POMO.at(6);
  assertEquals(stamp.timeout, 4);
});

Deno.test("PomoStamp.timeout (3)", () => {
  const stamp = TEST_POMO.at(11);
  assertEquals(stamp.timeout, 4);
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

Deno.test("Pomo.eternal", () => {
  assertEquals(TEST_POMO.eternal, true);
});

Deno.test("Pomo.fromPattern", () => {
  const pomo = Pomo.fromPattern({
    pattern: "25w5b25w5b25w10b",
    dayLength: DAY,
    ref: 0,
    scale: MINUTE,
  });
  assertEquals(
    pomo.cycle.periods,
    [
      1_500_000,
      300_000,
      1_500_000,
      300_000,
      1_500_000,
      600_000,
    ],
  );
});

function makeTestDates(dayStart: number, cycle: Cycle, length: number) {
  return Array.from(
    { length },
    (_, i) => ({
      in: new Date(dayStart + (i * MINUTE)),
      out: cycle.data[cycle.next(cycle.at(i * MINUTE))] -
        ((i * MINUTE) % cycle.total),
    }),
  );
}

Deno.test("Pomo example", () => {
  const dayStart = new Date().setHours(0, 0, 0, 0);
  const pomo = Pomo.fromPattern({
    pattern: "25w5b",
    dayLength: DAY,
    ref: dayStart,
    scale: MINUTE,
  });

  const testData = makeTestDates(dayStart, pomo.cycle, 100);
  for (const { in: date, out: timeout } of testData) {
    const stamp = pomo.at(date.valueOf());
    assertEquals(stamp.timeout, timeout);
  }
});
