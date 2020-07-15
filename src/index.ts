import Telegraf from 'telegraf';
import * as ngrok from 'ngrok';

import { AppConfig, TelegramConfig } from './config';
import { LoggerModule } from './modules';
import { StartController, TextController } from './controllers';

const bot = new Telegraf(TelegramConfig.token);

bot.catch((err: Error): void => {
  LoggerModule.error(`ERROR: ${err}\n`);
});

bot.start(StartController);
bot.on('text', TextController);

const launch = async (): Promise<void> => {
  LoggerModule.info('release -', AppConfig.release);

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
};

launch()
  .then((): void => LoggerModule.info('all systems nominal'))
  .catch((err: Error): void => {
    LoggerModule.error('bot - offline');
    LoggerModule.error(err);
  });
