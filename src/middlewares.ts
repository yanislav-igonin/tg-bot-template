import { appConfig } from './config/app.config';
import { database } from './database';
import { valueOrNull } from '@/values';
import { type BotContext } from 'context';
import { type NextFunction } from 'grammy';
// eslint-disable-next-line import/extensions
import { type Chat as TelegramChat } from 'grammy/out/types.node';

export const stateMiddleware = async (
  context: BotContext,
  next: NextFunction,
) => {
  // @ts-expect-error Property user   is missing in type {} but required in type
  context.state = {};
  // eslint-disable-next-line node/callback-return
  await next();
};

export const chatMiddleware = async (
  context: BotContext,
  next: NextFunction,
) => {
  const chatId = context.chat?.id;
  if (!chatId) {
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  // const chat = await chatModel.findUnique({
  //   where: { tgId: chatId.toString() },
  // });
  const chat = await database
    .selectFrom('chats')
    .where('tgId', '=', chatId.toString())
    .selectAll()
    .executeTakeFirst();
  if (chat) {
    // eslint-disable-next-line require-atomic-updates
    context.state.chat = chat;
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const name = (context.chat as TelegramChat.GroupChat).title ?? 'user';
  const toCreate = {
    name,
    tgId: chatId.toString(),
    type: context.chat?.type,
  };
  // const newChat = await chatModel.create({ data: toCreate });
  const newChat = await database
    .insertInto('chats')
    .values(toCreate)
    .returningAll()
    .executeTakeFirst();
  if (!newChat) {
    throw new Error('chat not created, something fucked up');
  }

  // eslint-disable-next-line require-atomic-updates
  context.state.chat = newChat;

  // eslint-disable-next-line node/callback-return
  await next();
};

export const userMiddleware = async (
  context: BotContext,
  next: NextFunction,
) => {
  const { from: tgUser } = context;
  if (!tgUser) {
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const { id: tgUserId } = tgUser;

  const user = await database
    .selectFrom('users')
    .selectAll()
    .where('tgId', '=', tgUserId.toString())
    .executeTakeFirst();
  if (user) {
    // eslint-disable-next-line require-atomic-updates
    context.state.user = user;
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const {
    first_name: firstName,
    language_code: language,
    last_name: lastName,
    username,
  } = tgUser;

  const toCreate = {
    firstName: valueOrNull(firstName),
    language: valueOrNull(language),
    lastName: valueOrNull(lastName),
    tgId: tgUserId.toString(),
    username: valueOrNull(username),
  };

  const newUser = await database
    .insertInto('users')
    .values(toCreate)
    .returningAll()
    .executeTakeFirst();
  if (!newUser) {
    throw new Error('user not created, something fucked up');
  }

  // eslint-disable-next-line require-atomic-updates
  context.state.user = newUser;

  // eslint-disable-next-line node/callback-return
  await next();
};

export const allowedUserMiddleware = async (
  context: BotContext,
  next: NextFunction,
) => {
  const { isAllowed, username } = context.state.user;
  const isAdmin = appConfig.adminsUsernames.includes(username ?? '');

  const hasAccess = isAllowed || isAdmin;

  if (!hasAccess) {
    await context.reply('Access denied');
    return;
  }

  // eslint-disable-next-line node/callback-return
  await next();
};
