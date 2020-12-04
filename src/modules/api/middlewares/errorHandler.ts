import { Middleware } from 'koa';

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
  }
};
