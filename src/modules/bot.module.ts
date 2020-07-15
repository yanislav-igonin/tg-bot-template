import Telegraf from 'telegraf';
import * as ngrok from 'ngrok';

import * as Config from '../config';
import { LoggerModule } from './logger.module';
import { StartController, TextController } from '../controllers';

class BotModule {
  private config: typeof Config;

  public constructor(config: typeof Config) {
    this.config = config;
  }

  public async launch(): Promise<void> {
    const { AppConfig, TelegramConfig } = this.config;

    const bot = new Telegraf(TelegramConfig.token);

    bot.catch((err: Error): void => {
      LoggerModule.error(`ERROR: ${err}\n`);
    });

    bot.start(StartController);
    bot.on('text', TextController);

    if (TelegramConfig.webhook.isEnabled) {
      let host: string;
      if (AppConfig.env === 'development') {
        host = await ngrok.connect(TelegramConfig.webhook.port);
      } else {
      // eslint-disable-next-line prefer-destructuring
        host = TelegramConfig.webhook.host;
      }

      await bot.launch({
        webhook: {
          domain: host,
          hookPath: TelegramConfig.webhook.path,
          port: TelegramConfig.webhook.port,
        },
      });
    } else {
      await bot.telegram.deleteWebhook();
      bot.startPolling();
    }

    LoggerModule.info('bot - online');
  }
}

const botModule = new BotModule(Config);

export { botModule as BotModule };
