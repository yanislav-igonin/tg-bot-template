import { Telegraf, Context } from 'telegraf';
import * as ngrok from 'ngrok';

import * as Config from '../config';
import { LoggerModule } from './logger.module';
import { StartController, TextController } from '../controllers';

export class BotModule {
  private config: typeof Config;
  private bot: Telegraf<Context>;

  constructor(config: typeof Config) {
    this.config = config;
    this.bot = new Telegraf(config.TelegramConfig.token);

    this.bot.catch((err: Error) => {
      LoggerModule.error(`ERROR: ${err}\n`);
    });

    this.bot.start(StartController);
    this.bot.on('text', TextController);
  }

  get telegraf() {
    return this.bot;
  }

  async launch() {
    const { AppConfig, TelegramConfig } = this.config;

    // if (TelegramConfig.webhook.isEnabled) {
    let host;
    if (AppConfig.env === 'development') {
      host = await ngrok.connect(TelegramConfig.webhook.port);
    } else {
      // eslint-disable-next-line prefer-destructuring
      host = TelegramConfig.webhook.host;
    }

    const url = `${host}${TelegramConfig.webhook.path}`;

    console.log('DEBUG ~ file: bot.module.ts ~ line 42 ~ BotModule ~ launch ~ url', url);
    await this.bot.telegram.setWebhook(url);

    // await this.bot.launch({
    //   webhook: {
    //     domain: host,
    //     hookPath: TelegramConfig.webhook.path,
    //     port: TelegramConfig.webhook.port,
    //   },
    // });
    // } else {
    //   await this.bot.telegram.deleteWebhook();
    //   this.bot.startPolling();
    // }

    LoggerModule.info('bot - online');
  }
}
