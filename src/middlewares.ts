import { appConfig } from 'config/app.config';
import { type BotContext } from 'context';
import { ChatModel, UserModel } from 'database/models';
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

  const name = (context.chat as TelegramChat.GroupChat).title ?? 'user';

  const chat = await ChatModel.findOneBy({ tgId: chatId.toString() });
  if (chat) {
    // Update chat info
    chat.name = name;
    await chat.save();

    // eslint-disable-next-line require-atomic-updates
    context.state.chat = chat;

    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const toCreate = {
    name,
    tgId: chatId.toString(),
    type: context.chat.type,
  };
  const newChat = await ChatModel.create(toCreate).save();
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

  const {
    id: userId,
    first_name: firstName,
    language_code: language,
    last_name: lastName,
    username,
  } = user;

  const databaseUser = await UserModel.findOneBy({ tgId: userId.toString() });
  if (databaseUser) {
    // Update user info
    databaseUser.firstName = firstName;
    databaseUser.language = language;
    databaseUser.lastName = lastName;
    databaseUser.username = username;
    await databaseUser.save();

    // eslint-disable-next-line require-atomic-updates
    context.state.user = databaseUser;
    // eslint-disable-next-line node/callback-return
    await next();
    return;
  }

  const newUser = await UserModel.create({
    firstName,
    language,
    lastName,
    tgId: userId.toString(),
    username,
  }).save();
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
  const isAdmin = appConfig.adminUsernames.includes(username ?? '');

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const hasAccess = isAllowed || isAdmin;

  if (!hasAccess) {
    return;
  }

  // eslint-disable-next-line node/callback-return
  await next();
};
