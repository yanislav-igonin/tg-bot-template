import { appConfig } from './config';
import { database, operators } from './database';
import { valueOrNull } from '@/values';
import { type BotContext } from 'context';
import { chats, users } from 'database/schemas';
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

  const chat = await database.query.chats.findFirst({
    where: operators.eq(chats.tgId, chatId.toString()),
  });
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
  await database.insert(chats).values(toCreate);
  const newChat = await database.query.chats.findFirst({
    where: operators.eq(chats.tgId, chatId.toString()),
  });

  // eslint-disable-next-line require-atomic-updates
  context.state.chat = newChat;

  // eslint-disable-next-line node/callback-return
  await next();
};

export const userMiddleware = async (
  context: BotContext,
  next: NextFunction,
) => {
  const { from: user } = context;
  if (!user) {
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const { id: userId } = user;

  const databaseUser = await database.query.users.findFirst({
    where: operators.eq(chats.tgId, userId.toString()),
  });
  if (databaseUser) {
    // eslint-disable-next-line require-atomic-updates
    context.state.user = databaseUser;
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const {
    first_name: firstName,
    language_code: language,
    last_name: lastName,
    username,
  } = user;

  const toCreate = {
    firstName: valueOrNull(firstName),
    language: valueOrNull(language),
    lastName: valueOrNull(lastName),
    tgId: userId.toString(),
    username: valueOrNull(username),
  };

  await database.insert(users).values(toCreate);
  const newUser = await database.query.users.findFirst({
    where: operators.eq(users.tgId, userId.toString()),
  });
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
