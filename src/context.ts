import { type Chat, type User } from 'database/models';
import { type Context } from 'grammy';

export type BotContext = Context & {
  state: {
    chat: Chat;
    user: User;
  };
};
