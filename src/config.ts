export interface BotConfig {
  // You will need @userinfobot https://telegram.me/userinfobot
  // Leave an array empty if you don't want any restrictions
  telegram: {
    // Which chats to watch. Get the ID by adding @userinfobot to your group.
    allowedChatIds: number[];
    // Only post messages from these userIDs.
    // To get a userID forward one of their messages to @userinfobot.
    allowedUserIds: number[];
    // Only post messages matching at least one of these patterns.
    contentFilters: RegExp[];
  };
}

// Edit this to configure your bot
export const config: BotConfig = {
  telegram: {
    allowedChatIds: [],
    allowedUserIds: [],
    contentFilters: [],
  },
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
