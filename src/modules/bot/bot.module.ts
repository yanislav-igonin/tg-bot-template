import { Telegraf, Context } from 'telegraf';
import * as ngrok from 'ngrok';

import * as Config from '../../common/config';
import { LoggerModule } from '../logger.module';
import { StartController, TextController } from './controllers';
import { metrics } from '../../common/utils';

export class BotModule {
  private config: typeof Config;
  private bot: Telegraf<Context>;

  constructor(config: typeof Config) {
    this.config = config;
    this.bot = new Telegraf(config.telegramConfig.token);

    this.bot.catch((err: Error) => {
      metrics.error();
      LoggerModule.error(`ERROR: ${err}\n`);
    });

    // TODO: move to middlewares
    this.bot.use(async (_, next) => {
      metrics.request();
      await next();
    });

    this.bot.start(StartController);
    this.bot.on('text', TextController);
  }

  get telegraf() {
    return this.bot;
  }

  async launch() {
    const { appConfig, telegramConfig } = this.config;

    let host;
    if (appConfig.env === 'development') {
      host = await ngrok.connect(telegramConfig.webhook.port);
    } else {
      // eslint-disable-next-line prefer-destructuring
      host = telegramConfig.webhook.host;
    }

    const url = `${host}${telegramConfig.webhook.path}`;
    await this.bot.telegram.setWebhook(url);
    LoggerModule.info('bot - online');
  }
}
