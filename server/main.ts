// Run:
// deno run -A server/main.ts

import { serve } from "./deps.ts";
import { handler } from "./handler.ts";
import { getClockState } from "./clock_service.ts";
import { doPomo } from "./pomo_service.ts";

const PORT = Deno.env.get("PORT") || "8000";
const port = parseInt(PORT);

console.log(`Server running on http://localhost:${PORT}`);

doPomo({
  patterns: [25 * 60 * 1e3, 5 * 60 * 1e3],
});

await serve(handler, {
  port,
  onListen({ hostname, port }) {
    console.log(`Listening on ${hostname}:${port}`);
  },
});
