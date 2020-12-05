import { Middleware } from 'koa';
import { BotModule } from '../../bot/bot.module';
import * as Config from '../../../common/config';

export const botHandler = (
  bot: BotModule,
  config: typeof Config,
  // eslint-disable-next-line consistent-return
): Middleware => async (ctx, next) => {
  if (ctx.method !== 'POST' && ctx.url !== config.telegramConfig.webhook.path) {
    return next();
  }
  // @ts-ignore
  await bot.telegraf.handleUpdate(ctx.request.body, ctx.response);
  ctx.status = 200;
};
