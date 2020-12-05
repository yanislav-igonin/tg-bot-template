import * as Koa from 'koa';
import { BotModule } from '..';

import * as Config from '../../common/config';
import { LoggerModule } from '../logger.module';
import { middlewares, botHandler } from './middlewares';

export class ApiModule {
  private config: typeof Config;
  private server: Koa;
  private bot: BotModule;

  constructor(config: typeof Config, bot: BotModule) {
    this.config = config;
    this.server = new Koa();
    this.bot = bot;

    middlewares.forEach((m) => this.server.use(m));

    this.server.use(botHandler(this.bot, this.config));
    this.server.use(async (ctx) => {
      ctx.body = 'Hello World';
    });
  }

  async launch() {
    const { telegramConfig } = this.config;
    await this.bot.launch();
    this.server.listen(telegramConfig.webhook.port);
    LoggerModule.info('server - online');
  }
}
