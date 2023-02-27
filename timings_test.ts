import { assertEquals } from "./test_deps.ts";
import { timings, TimingsInput } from "./timings.ts";

Deno.test("timings should return expected timings", () => {
  const input: TimingsInput<"short" | "medium" | "long"> = {
    patterns: {
      short: "10 5 10 5 10 10",
      medium: "25 5 25 5 25 10",
      long: "50 10 50 10 50 20",
    },
    timestamp: "2023-01-01T12:00:00.000Z", // January 1, 2023 12:00:00 PM UTC
  };

  const expected = [
    {
      ids: ["short", "medium", "long"],
      duration: 3600000,
      timeout: 1100000,
    },
    {
      ids: ["short"],
      duration: 1800000,
      timeout: 310000,
    },
    {
      ids: ["medium"],
      duration: 1800000,
      timeout: 310000,
    },
    {
      ids: ["long"],
      duration: 1800000,
      timeout: 610000,
    },
    {
      ids: ["short", "medium", "long"],
      duration: 3600000,
      timeout: 710000,
    },
    {
      ids: ["short"],
      duration: 1800000,
      timeout: 1010000,
    },
    {
      ids: ["medium"],
      duration: 1800000,
      timeout: 1010000,
    },
    {
      ids: ["long"],
      duration: 1800000,
      timeout: 1310000,
    },
    {
      ids: ["short"],
      duration: 1800000,
      timeout: 1710000,
    },
  ];

  const actual = timings(input);
  console.log({ actual });

  assertEquals(actual, expected);
});
