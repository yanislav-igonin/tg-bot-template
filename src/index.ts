// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata';
import { appConfig } from './config';
import { connection } from './database';
import { logger } from '@/logger';
import {
  allowedUserMiddleware,
  chatMiddleware,
  stateMiddleware,
  userMiddleware,
} from '@/middlewares';
import { replies } from '@/replies';
import { type BotContext } from 'context';
import { MessageModel } from 'database/models';
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

  const message = MessageModel.create({
    chat: chat.id,
    text,
    tgId: replyToMessageId.toString(),
    user: user.id,
  });
  await connection.em.persistAndFlush(message);

  try {
    const replyText = `Echo: ${text}`;
    const botReply = await context.reply(replyText, {
      reply_to_message_id: replyToMessageId,
    });
    const replyMessage = MessageModel.create({
      chat: chat.id,
      text: replyText,
      tgId: botReply.message_id.toString(),
      user: user.id,
    });
    await connection.em.persistAndFlush(replyMessage);
  } catch (error) {
    await context.reply(replies.error);
    throw error;
  }
});

const start = async () => {
  await connection.connect();
  logger.info('database connected');
  // eslint-disable-next-line promise/prefer-await-to-then
  bot.start().catch(async (error) => {
    logger.error(error);
    await connection.close();
  });
};

start()
  .then(() => logger.info('bot started'))
  .catch(logger.error);
