import { serve } from "./deps.ts";

import { PORT } from "./env.ts";

if (import.meta.main) {
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
      return new Response("Hello World"); // TODO: Add JSON response.
    }

    default: {
      return new Response("Not Found", {
        status: 404,
      });
    }
  }
}
