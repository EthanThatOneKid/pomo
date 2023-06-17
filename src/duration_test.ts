import * as dntShim from "./_dnt.test_shims.js";
import { assertEquals } from "./dev_deps.js";

import { format } from "./duration.js";

dntShim.Deno.test("format should format a duration of 0 milliseconds with the format 'HH:mm:ss.SSS'", () => {
  assertEquals(format(0, "HH:mm:ss.SSS"), "00:00:00.000");
});

dntShim.Deno.test("format should format a duration of 1 hour with the format 'HH:mm:ss.SSS'", () => {
  assertEquals(format(3_600_000, "HH:mm:ss.SSS"), "01:00:00.000");
});

dntShim.Deno.test("format should format a duration of 1 hour and 1 minute with the format 'HH:mm:ss.SSS'", () => {
  assertEquals(format(3_660_000, "HH:mm:ss.SSS"), "01:01:00.000");
});

dntShim.Deno.test("format should format a duration of 1 hour and 1 minute and 1 second with the format 'HH:mm:ss.SSS'", () => {
  assertEquals(format(3_661_000, "HH:mm:ss.SSS"), "01:01:01.000");
});
