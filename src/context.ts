import { type Chat, type User } from 'database/types';
import { type Context } from 'grammy';

export type BotContext = Context & {
  state: {
    chat: Chat;
    user: User;
  };
};
