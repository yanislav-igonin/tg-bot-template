// eslint-disable-next-line import/no-unassigned-import
import 'reflect-metadata';
import { appConfig } from 'config/app.config';
import { type BotContext } from 'context';
import database from 'database';
import { MessageModel } from 'database/models';
import { Bot } from 'grammy';
import { logger } from 'logger';
import {
  allowedUserMiddleware,
  chatMiddleware,
  stateMiddleware,
  userMiddleware,
} from 'middlewares';
import { replies } from 'replies';

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
  // const { user, chat } = context.state;
  const text = context.message.text;
  const { message_id: replyToMessageId } = context.message;

  await MessageModel.create({
    chat: context.state.chat,
    text,
    tgId: context.message.message_id.toString(),
    user: context.state.user,
  }).save();

  try {
    const botMessage = `Echo: ${text}`;
    const botReply = await context.reply(botMessage, {
      reply_to_message_id: replyToMessageId,
    });

    await MessageModel.create({
      chat: context.state.chat,
      text: botMessage,
      tgId: botReply.message_id.toString(),
      userId: 1,
    }).save();
  } catch (error) {
    await context.reply(replies.error);
    throw error;
  }
});

const start = async () => {
  await database.initialize();
  logger.info('database connected');
  // eslint-disable-next-line promise/prefer-await-to-then
  bot.start().catch(async (error) => {
    logger.error(error);
    await database.destroy();
  });
};

start()
  .then(() => logger.info('bot started'))
  .catch(logger.error);
