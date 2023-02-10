// Run:
// deno run -A server/main.ts

import { MINUTE } from "../mod.ts";

import { serve } from "./deps.ts";
import { getClockState } from "./clock_service.ts";
import { doPomo } from "./pomo_service.ts";
import { PORT } from "./env.ts";

doPomo({
  patterns: [
    [25 * MINUTE, 5 * MINUTE],
  ],
  clock: getClockState,
  fn(pomo) {
    console.log({ pomo });
  },
});

await serve(handle, {
  port: PORT,
  onListen({ hostname, port }) {
    console.log(`Listening on ${hostname}:${port}`);
  },
});

async function handle(r: Request): Promise<Response> {
  const url = new URL(r.url);

  switch (url.pathname) {
    case "/": {
      return new Response("Hello World");
    }

    default: {
      return new Response("Not Found", { status: 404 });
    }
  }
}
