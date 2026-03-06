import { Hono } from "hono";
import { config, env } from "./config.js";
import { shouldPost } from "./filter.js";
import { createTwitterClient, postTweet } from "./twitter.js";
import type { TelegramUpdate } from "./filter.js";

const twitter = createTwitterClient(env);

export function createApp(): Hono {
  const app = new Hono();

  app.post("/webhook", async (c) => {
    const secret = c.req.header("X-Telegram-Bot-Api-Secret-Token");
    if (secret !== env.TELEGRAM_WEBHOOK_SECRET) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const update = (await c.req.json()) as TelegramUpdate;
    const text = shouldPost(update, config);

    if (text) {
      try {
        await postTweet(twitter, text);
        console.log("Tweet posted:", text);
      } catch (err) {
        // Log but return 200. If we return an error Telegram will retry the same message
        console.error("Failed to post tweet:", text, err);
      }
    }

    return c.json({ ok: true });
  });

  return app;
}
