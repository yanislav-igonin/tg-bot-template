import { database } from './database';
import { logger } from '@/logger';
import {
  allowedUserMiddleware,
  chatMiddleware,
  stateMiddleware,
  userMiddleware,
} from '@/middlewares';
import { replies } from '@/replies';
import { appConfig } from 'config/app.config';
import { type BotContext } from 'context';
import { Bot } from 'grammy';

const bot = new Bot<BotContext>(appConfig.botToken);
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
  const { user, chat } = context.state;
  const text = context.message.text;
  const { message_id: replyToMessageId } = context.message;

  await database
    .insertInto('messages')
    .values({
      chatId: chat.id,
      text,
      tgId: replyToMessageId.toString(),
      userId: user.id,
    })
    .executeTakeFirst();

  try {
    const message = `Echo: ${text}`;
    const botReply = await context.reply(message, {
      reply_to_message_id: replyToMessageId,
    });

    await database
      .insertInto('messages')
      .values({
        chatId: chat.id,
        text: message,
        tgId: botReply.message_id.toString(),
        userId: 1,
      })
      .executeTakeFirst();
  } catch (error) {
    await context.reply(replies.error);
    throw error;
  }
});

const start = async () => {
  // await database.;
  // logger.info('database connected');
  // eslint-disable-next-line promise/prefer-await-to-then
  bot.start().catch(async (error) => {
    logger.error(error);
    await database.destroy();
  });
};

start()
  .then(() => logger.info('bot started'))
  .catch(logger.error);
