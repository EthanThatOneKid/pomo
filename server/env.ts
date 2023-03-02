export const PORT = parseInt(Deno.env.get("PORT") || "3000");
export const POMO_PATTERNS = Deno.env.get("POMO_PATTERNS") ||
  "25-5-10: 25 5 25 5 25 10; 50-10: 50 10; 1: 1 1";
export const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL") || "";
