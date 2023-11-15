import { type SqlEntityRepository } from '@mikro-orm/postgresql';
import {
  type ChatModel,
  type MessageModel,
  type UserModel,
} from 'database/models';
import { type Context } from 'grammy';

export type BotContext = Context & {
  repositories: {
    chat: SqlEntityRepository<ChatModel>;
    message: SqlEntityRepository<MessageModel>;
    save: (entity: Partial<unknown>) => Promise<void>;
    user: SqlEntityRepository<UserModel>;
  };
  state: {
    chat: ChatModel;
    user: UserModel;
  };
};
