import { Context, Next } from 'koa';
import * as config from '../../../common/config';

export const auth = async (ctx: Context, next: Next) => {
  if (ctx.url !== config.TelegramConfig.webhook.path) {
    const { authorization }: { authorization: string } = ctx.request.header;
    // TODO: add http error
    if (authorization === undefined) throw new Error('Auth token required.');
    // TODO: add http error
    const token = authorization.split(' ')[1];
    if (token !== config.AppConfig.apiToken) throw new Error('Wrong auth token.');
  }

  await next();
};
