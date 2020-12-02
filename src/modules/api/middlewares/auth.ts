import { Context, Next } from 'koa';

export const auth = async (ctx: Context, next: Next) => {
  const { authorization }: {authorization: string} = ctx.request.header;
  if (authorization === undefined) {} // throw error
  const token = authorization.split(' ')[1];
  // check token
  await next();
};
