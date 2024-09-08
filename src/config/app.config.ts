import { valueOrDefault } from 'values';

/* eslint-disable node/no-process-env */
export const appConfig = {
  adminUsernames: valueOrDefault(process.env.ADMIN_USERNAMES?.split(','), []),
  botToken: valueOrDefault(process.env.BOT_TOKEN, ''),
  env: valueOrDefault(process.env.ENV, 'development'),
};
/* eslint-enable node/no-process-env */

export const isProduction = () => appConfig.env === 'production';
