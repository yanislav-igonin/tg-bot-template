import { valueOrDefault } from '@/values';

/* eslint-disable node/no-process-env */
export const config = {
  adminsUsernames: valueOrDefault(process.env.ADMINS_USERNAMES?.split(','), []),
  botToken: valueOrDefault(process.env.BOT_TOKEN, ''),
  env: valueOrDefault(process.env.ENV, 'development'),
};
/* eslint-enable node/no-process-env */

export const isProduction = () => config.env === 'production';
