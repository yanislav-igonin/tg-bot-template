import Telegraf from 'telegraf';
import * as ngrok from 'ngrok';

import { app, telegram } from './config';
import { logger } from './modules';
import { start, text } from './controllers';

const bot = new Telegraf(telegram.token);

bot.catch((err: Error): void => {
  logger.error(`ERROR: ${err}\n`);
});

bot.start(start);
bot.on('text', text);

const launch = async (): Promise<void> => {
  logger.info('release -', app.release);

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

  logger.info('bot - online');
};

launch()
  .then((): void => logger.info('all systems nominal'))
  .catch((err: Error): void => {
    logger.error('bot - offline');
    logger.error(err);
  });
