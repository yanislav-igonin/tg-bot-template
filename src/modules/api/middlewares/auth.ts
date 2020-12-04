import { Context, Next } from 'koa';
import { AppConfig } from '../../../common/config';

export const auth = async (ctx: Context, next: Next) => {
  const { authorization }: { authorization: string } = ctx.request.header;
  // TODO: add http error
  if (authorization === undefined) throw new Error('Auth token required.');
  // TODO: add http error
  const token = authorization.split(' ')[1];
  if (token !== AppConfig.apiToken) throw new Error('Wrong auth token.');
  await next();
};
