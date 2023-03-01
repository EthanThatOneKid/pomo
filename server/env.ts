export const PORT = parseInt(Deno.env.get("PORT") || "3000");
export const POMO_PATTERNS = parsePomoPatterns(
  Deno.env.get("POMO_PATTERNS") || "25 5 25 5 25 10",
);

function parsePomoPatterns(patterns: string): string[] {
  return patterns.split(";").map((pattern) => pattern.trim());
}
