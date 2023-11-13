import { type UserModel } from 'database/models';
import { type Context } from 'grammy';

export type BotContext = Context & {
  state: {
    user: UserModel;
  };
};
