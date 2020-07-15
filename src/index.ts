import Telegraf from 'telegraf';
import * as ngrok from 'ngrok';

import { app, telegram } from './config';
import { LoggerModule } from './modules';
import { StartController, TextController } from './controllers';

const bot = new Telegraf(telegram.token);

bot.catch((err: Error): void => {
  LoggerModule.error(`ERROR: ${err}\n`);
});

bot.start(StartController);
bot.on('text', TextController);

const launch = async (): Promise<void> => {
  LoggerModule.info('release -', app.release);

  if (telegram.webhook.isEnabled) {
    let host: string;
    if (app.env === 'development') {
      host = await ngrok.connect(telegram.webhook.port);
    } else {
      // eslint-disable-next-line prefer-destructuring
      host = telegram.webhook.host;
    }

    await bot.launch({
      webhook: {
        domain: host,
        hookPath: telegram.webhook.path,
        port: telegram.webhook.port,
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
