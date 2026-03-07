export enum TwitterAction {
  TWEET = "tweet",
  DM = "dm",
}

// You will need @userinfobot https://telegram.me/userinfobot
// Leave an array empty if you don't want any restrictions
export interface BotConfig {
  telegram: {
    // Which chats to watch. Get the ID by adding @userinfobot to your group.
    allowedChatIds: number[];

    // Only post messages from these userIDs.
    // To get a userID forward one of their messages to @userinfobot.
    allowedUserIds: number[];

    // Only post messages matching at least one of these patterns.
    contentFilters: RegExp[];
  };
  twitter:
    | { action: TwitterAction.TWEET }
    | {
        action: TwitterAction.DM;
        // Numeric Twitter user IDs to DM. Run `pnpm twitter:user-id <handle>` to look up.
        recipientIds: string[];
      };
}

// Edit this to configure your bot
export const config: BotConfig = {
  telegram: {
    allowedChatIds: [],
    allowedUserIds: [],
    contentFilters: [],
  },
  twitter: { action: TwitterAction.DM, recipientIds: [] },
};

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const env = {
  TELEGRAM_BOT_TOKEN: requireEnv("TELEGRAM_BOT_TOKEN"),
  TELEGRAM_WEBHOOK_SECRET: requireEnv("TELEGRAM_WEBHOOK_SECRET"),
  TWITTER_CONSUMER_KEY: requireEnv("TWITTER_CONSUMER_KEY"),
  TWITTER_CONSUMER_KEY_SECRET: requireEnv("TWITTER_CONSUMER_KEY_SECRET"),
  TWITTER_ACCESS_TOKEN: requireEnv("TWITTER_ACCESS_TOKEN"),
  TWITTER_ACCESS_TOKEN_SECRET: requireEnv("TWITTER_ACCESS_TOKEN_SECRET"),
};
