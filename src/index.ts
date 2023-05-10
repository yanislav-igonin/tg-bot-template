import { config } from '@/config';
import { database } from '@/database';
import { logger } from '@/logger';
import {
  allowedUserMiddleware,
  chatMiddleware,
  stateMiddleware,
  userMiddleware,
} from '@/middlewares';
import { replies } from '@/replies';
import { type BotContext } from 'context';
import { Bot } from 'grammy';

const bot = new Bot<BotContext>(config.botToken);
bot.catch(logger.error);
bot.use(stateMiddleware);
bot.use(userMiddleware);
bot.use(chatMiddleware);
bot.use(allowedUserMiddleware);

bot.command('start', async (context) => {
  await context.reply(replies.start);
});

bot.command('help', async (context) => {
  await context.reply(replies.help);
});

bot.on('message:text', async (context) => {
  const text = context.message.text;
  const { message_id: replyToMessageId } = context.message;

  try {
    const message = `Echo: ${text}`;
    await context.reply(message, { reply_to_message_id: replyToMessageId });
  } catch (error) {
    await context.reply(replies.error);
    throw error;
  }
});

const start = async () => {
  await database.$connect();
  logger.info('database connected');
  // eslint-disable-next-line promise/prefer-await-to-then
  bot.start().catch(async (error) => {
    logger.error(error);
    await database.$disconnect();
  });
};

start()
  .then(() => logger.info('bot started'))
  .catch(logger.error);
