import { valueOrDefault } from '@/values';

/* eslint-disable node/no-process-env */
export const appConfig = {
  adminsUsernames: valueOrDefault(process.env.ADMINS_USERNAMES?.split(','), []),
  botToken: valueOrDefault(process.env.BOT_TOKEN, ''),
  env: valueOrDefault(process.env.ENV, 'development'),
};
export const databaseConfig = {
  url: valueOrDefault(process.env.DATABASE_URL, ''),
};
/* eslint-enable node/no-process-env */

export const isProduction = () => appConfig.env === 'production';
