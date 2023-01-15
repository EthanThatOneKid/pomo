import { assertEquals } from "./test_deps.ts";

import { Cycle } from "./cycle.ts";

Deno.test("cycle - at", () => {
  const c = new Cycle([10, 10, 10]);
  assertEquals(c.at(0), 0);
  assertEquals(c.at(5), 0);
  assertEquals(c.at(10), 1);
  assertEquals(c.at(15), 1);
  assertEquals(c.at(20), 2);
  assertEquals(c.at(25), 2);
  assertEquals(c.at(30), 0);
  assertEquals(c.at(35), 0);
  assertEquals(c.at(40), 1);
  assertEquals(c.at(45), 1);
});

Deno.test("cycle - next", () => {
  const c = new Cycle([10, 10, 10]);
  assertEquals(c.next(c.at(0)), 1);
  assertEquals(c.next(c.at(5)), 1);
  assertEquals(c.next(c.at(10)), 2);
  assertEquals(c.next(c.at(15)), 2);
  assertEquals(c.next(c.at(20)), 0);
  assertEquals(c.next(c.at(25)), 0);
  assertEquals(c.next(c.at(30)), 1);
  assertEquals(c.next(c.at(35)), 1);
  assertEquals(c.next(c.at(40)), 2);
  assertEquals(c.next(c.at(45)), 2);
});

Deno.test("cycle - next (negative count)", () => {
  const c = new Cycle([10, 10, 10]);
  assertEquals(c.next(0, -1), 2);
  assertEquals(c.next(1, -1), 0);
  assertEquals(c.next(2, -1), 1);

  assertEquals(c.next(0, -2), 1);
  assertEquals(c.next(1, -2), 2);
  assertEquals(c.next(2, -2), 0);
});
