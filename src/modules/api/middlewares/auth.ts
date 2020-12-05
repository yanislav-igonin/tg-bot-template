import { Middleware } from 'koa';
import * as config from '../../../common/config';
import { UnauthorizedError, ForbiddenError } from '../errors';

export const auth: Middleware = async (ctx, next) => {
  if (ctx.url !== config.TelegramConfig.webhook.path) {
    const { authorization }: { authorization: string } = ctx.request.header;
    if (authorization === undefined) throw new UnauthorizedError();
    const token = authorization.split(' ')[1];
    if (token !== config.AppConfig.apiToken) throw new ForbiddenError();
  }

  await next();
};
