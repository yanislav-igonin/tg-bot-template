import { Middleware } from 'koa';
import * as config from '../../../common/config';
import { UnauthorizedError, ForbiddenError } from '../errors';

export const auth: Middleware = async (ctx, next) => {
  if (ctx.url !== config.telegramConfig.webhook.path) {
    // Authorization: Bearer {secret}
    const { authorization }: { authorization: string } = ctx.request.header;
    if (authorization === undefined) throw new UnauthorizedError();
    const token = authorization.split(' ')[1];
    if (token !== config.appConfig.apiToken) throw new ForbiddenError();
  }

  await next();
};
