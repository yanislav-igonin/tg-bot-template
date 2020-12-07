import { Middleware } from 'koa';
import { BotModule } from '../../bot/bot.module';
import * as Config from '../../../common/config';

export const botHandler = (
  bot: BotModule,
  config: typeof Config,
): Middleware => (ctx, next) => {
  const { method, url } = ctx;
  const { path } = config.telegramConfig.webhook;
  if (method !== 'POST' && url !== path) return next();

  ctx.status = 200;
  // @ts-ignore
  return bot.telegraf.handleUpdate(ctx.request.body, ctx.response);
};
