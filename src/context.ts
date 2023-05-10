import { type User } from '@/database';
import { type Context } from 'grammy';

export type BotContext = Context & {
  state: {
    user: User;
  };
};
