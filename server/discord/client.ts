import type { RESTPostAPIWebhookWithTokenJSONBody } from "./deps.ts";

/**
 * WebhookOptions are the options for a webhook message.
 */
export interface WebhookOptions extends RESTPostAPIWebhookWithTokenJSONBody {
  /**
   * url is the webhook url.
   */
  url: string;
}

/**
 * @see https://discord.com/developers/docs/resources/webhook#execute-webhook
 */
export function webhook(o: WebhookOptions) {
  return fetch(o.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(o),
  });
}
