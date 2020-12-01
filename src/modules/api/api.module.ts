import * as Koa from 'koa';
import { BotModule } from '..';

import * as Config from '../../config';
import { LoggerModule } from '../logger.module';
import { middlewares } from './middlewares';

export class ApiModule {
  private config: typeof Config;
  private server: Koa;
  private bot: BotModule;

  constructor(config: typeof Config, bot: BotModule) {
    this.config = config;
    this.server = new Koa();
    this.bot = bot;

    middlewares.forEach((m) => this.server.use(m));

    // eslint-disable-next-line consistent-return
    this.server.use(async (ctx, next) => {
      if (ctx.method !== 'POST' && ctx.url !== Config.TelegramConfig.webhook.path) {
        return next();
      }
      // @ts-ignore
      await bot.telegraf.handleUpdate(ctx.request.body, ctx.response);
      ctx.status = 200;
    });
    this.server.use(async (ctx) => {
      ctx.body = 'Hello World';
    });
  }

  async launch() {
    const { TelegramConfig } = this.config;
    await this.bot.launch();
    this.server.listen(TelegramConfig.webhook.port);
    LoggerModule.info('server - online');
  }
}
