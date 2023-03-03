export const PORT = parseInt(Deno.env.get("PORT") || "3000");
export const POMO_PATTERNS = Deno.env.get("POMO_PATTERNS") ||
  "20-5-10: 20 5 20 5 20 10; 50-10: 50 10";
export const DISCORD_WEBHOOK_URL = Deno.env.get("DISCORD_WEBHOOK_URL") || "";
