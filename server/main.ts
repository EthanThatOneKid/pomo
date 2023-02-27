import { serve } from "./deps.ts";

import { PORT } from "./env.ts";
import * as pomo from "./pomo/mod.ts";
import * as discord from "./discord/mod.ts";

if (import.meta.main) {
  // const timings = getTimings(

  await serve(handle, {
    port: PORT,
    onListen({ hostname, port }) {
      console.log(`Listening on ${hostname}:${port}`);
    },
  });
}

function handle(request: Request): Response {
  const url = new URL(request.url);
  switch (true) {
    case url.pathname === "/": {
      return pomo.json({
        pattern: url.searchParams.get("pattern") ?? "25 5 25 5 25 10",
        timestamp: url.searchParams.get("timestamp") || undefined,
        format: url.searchParams.get("format") || undefined,
      });
    }

    default: {
      return new Response("Not Found", {
        status: 404,
      });
    }
  }
}
