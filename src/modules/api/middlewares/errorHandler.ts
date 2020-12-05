import { Middleware } from 'koa';
import { HttpError } from '../errors';

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpError) {
      ctx.status = err.status;
      ctx.body = {
        error: {
          message: err.message,
        },
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: {
          message: 'Internal server error.',
        },
      };
    }
  }
};
