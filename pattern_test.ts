import { assertEquals } from "./dev_deps.ts";

import { parsePattern } from "./pattern.ts";

Deno.test("parsePattern should parse the pattern string and return an array of numbers", () => {
  const pattern = "25w5b25w5b25w25b10";
  const scale = 1;
  const expected = [25, 5, 25, 5, 25, 25, 10];
  const result = parsePattern(pattern, scale);
  assertEquals(result, expected);
});

Deno.test("parsePattern should handle non-digit characters", () => {
  const pattern = "25w-5b 25w,5b25w25b10";
  const scale = 1;
  const expected = [25, 5, 25, 5, 25, 25, 10];
  const result = parsePattern(pattern, scale);
  assertEquals(result, expected);
});

Deno.test("parsePattern should handle a scale factor", () => {
  const pattern = "25w5b25w5b25w25b10";
  const scale = 2;
  const expected = [50, 10, 50, 10, 50, 50, 20];
  const result = parsePattern(pattern, scale);
  assertEquals(result, expected);
});

Deno.test("parsePattern should return an empty array if pattern is empty", () => {
  assertEquals(parsePattern("", 1), []);
});
