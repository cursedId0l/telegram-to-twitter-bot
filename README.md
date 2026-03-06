# Telegram to Twitter Bot

Forwards messages from a Telegram group chat to Twitter/X.

## Setup

### 1. Create a Telegram bot

1. Open Telegram and start a chat with [@BotFather](https://t.me/BotFather)
2. Send `/newbot` and follow the prompts
3. Copy the **bot token** — this is your `TELEGRAM_BOT_TOKEN`
4. Make up a random string for `TELEGRAM_WEBHOOK_SECRET` (used to verify requests come from Telegram)

### 2. Create a Twitter/X app

1. Go to [developer.x.com](https://developer.x.com) and create a new app
2. Under **User authentication settings**, enable OAuth with **Read and Write** permissions and add a callback URL (your website or `http://localhost`)
3. Fund your developer account — X requires a paid plan for write access even though the [docs dont say it yet](https://devcommunity.x.com/t/503-errors-since-2-28/258704)
4. Under **Keys and Tokens**, copy:
   - Consumer Key → `TWITTER_CONSUMER_KEY`
   - Consumer Secret → `TWITTER_CONSUMER_KEY_SECRET`
   - Access Token → `TWITTER_ACCESS_TOKEN`
   - Access Token Secret → `TWITTER_ACCESS_TOKEN_SECRET`

> Note: If you change app permissions after generating tokens, regenerate the Access Token and Secret or the old tokens won't have write access.

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in all the values:

```
cp .env.example .env
```

### 4. Configure filters

Edit `src/config.ts` to set which chats and users to watch, and any content filters:

```ts
export const config: BotConfig = {
  telegram: {
    allowedChatIds: [1234567890], // get this by adding @userinfobot to your group
    allowedUserIds: [987654321], // forward a message to @userinfobot to get a user ID
    contentFilters: [/keyword/i], // only post messages matching these patterns
  },
};
```

Leave any array empty to allow all (e.g. empty `allowedUserIds` allows all users in the chat).

### 5. Set up your Telegram group

1. Create a Telegram group
2. Add your bot to the group
3. Add any other bots or users whose messages you want to forward to Twitter

## Local development

### Prerequisites

- [ngrok](https://ngrok.com) — to expose your local server to Telegram's webhook

### First time setup

Make the webhook script executable:

```
chmod +x scripts/webhook.sh
```

### Steps

1. Start ngrok on your local port:

   ```
   ngrok http 3000
   ```

2. Register the ngrok URL as your Telegram webhook:

   ```
   pnpm webhook:register --register https://abc123.ngrok.io
   ```

3. Start the dev server:

   ```
   pnpm dev
   ```

4. Send a message in your Telegram group (or have the other bot send one). If it matches your filters, it will be posted to Twitter.

To stop and clean up, delete the webhook when done:

```
./scripts/webhook.sh --delete
```

### Webhook scripts

## Deployment (AWS)

TODO
