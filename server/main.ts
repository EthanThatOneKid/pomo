import { retry, serve } from "./deps.ts";

import { PomoCollection } from "../mod.ts";

import * as pomo from "./pomo/mod.ts";
import * as discord from "./discord/mod.ts";
import { DISCORD_WEBHOOK_URL, POMO_PATTERNS, PORT } from "./env.ts";

if (import.meta.main) {
  const dayStart = new Date().setHours(0, 0, 0, 0);
  const collection = PomoCollection.fromString(
    POMO_PATTERNS,
    dayStart,
  );

  const timestamp = new Date().getTime();
  const ids = pomo.start(
    collection,
    timestamp,
    async (name, period) => {
      const response = await retry(
        () => {
          return discord.webhook({
            url: DISCORD_WEBHOOK_URL,
            content: pomo.formatMessage(collection, name, period),
          });
        },
        {
          multiplier: 2,
          maxTimeout: 60000,
          maxAttempts: 5,
          minTimeout: 100,
        },
      ).catch(console.error);
      if (!response) {
        return;
      }

      console.log(response.status, response.statusText, await response.text());
    },
  );

  await serve(handle, {
    port: PORT,
    onListen({ port }) {
      console.log(`Listening on http://localhost:${port}`);
    },
  });

  pomo.cancel(ids);
}

function handle(request: Request): Response {
  const url = new URL(request.url);
  switch (true) {
    case url.pathname === "/": {
      return pomo.json({
        patterns: url.searchParams.get("patterns") ??
          url.searchParams.get("p") ??
          POMO_PATTERNS,
        timestamp: url.searchParams.get("timestamp") || undefined,
        format: url.searchParams.get("format") || undefined,
      });
    }

    default: {
      return new Response("Not Found", { status: 404 });
    }
  }
}
