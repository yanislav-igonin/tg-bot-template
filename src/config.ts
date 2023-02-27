/* eslint-disable node/no-process-env */
export const config = {
  allowedUsernames: process.env.ALLOWED_USERNAMES?.split(',') ?? [],
  botToken: process.env.BOT_TOKEN ?? '',
  env: process.env.ENV ?? 'development',
};

export const isProduction = () => config.env === 'production';
