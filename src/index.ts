import Telegraf from 'telegraf';
import * as ngrok from 'ngrok';
import * as crypto from 'crypto';

import { app } from './config';
import { logger } from './modules';
import { start, text } from './controllers';

const bot = new Telegraf(app.botToken);

bot.catch((err: Error): void => {
  logger.error(`ERROR: ${err}\n`);
});

bot.start(start);
bot.on('text', text);

const launch = async (): Promise<void> => {
  logger.info('release -', app.release);

  if (app.isWebhookDisabled) {
    await bot.telegram.deleteWebhook();
    bot.startPolling();
  } else {
    let host: string;
    if (app.env === 'development') {
      host = await ngrok.connect(app.webhookPort);
    } else {
      host = app.webhookHost;
    }

    const hookPath = `/bots/telegram/${crypto.randomBytes(32).toString('hex')}`;

    await bot.launch({
      webhook: {
        domain: host,
        hookPath,
        port: app.webhookPort,
      },
    });
  }

  logger.info('bot - online');
};

launch()
  .then((): void => logger.info('all systems nominal'))
  .catch((err: Error): void => {
    logger.error('bot - offline');
    logger.error(err);
  });
