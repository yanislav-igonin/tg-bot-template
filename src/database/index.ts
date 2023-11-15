import { ChatModel, MessageModel, UserModel } from './models';
import { databaseConfig } from '@/config';
import { type EntityRepository } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/core';
import { type PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package

// eslint-disable-next-line import/no-mutable-exports
let connection: MikroORM<PostgreSqlDriver>;
const repositories = {} as {
  chat: EntityRepository<ChatModel>;
  message: EntityRepository<MessageModel>;
  user: EntityRepository<UserModel>;
};

const initRepositories = () => {
  repositories.chat = connection.em.getRepository(ChatModel);
  repositories.user = connection.em.getRepository(UserModel);
  repositories.message = connection.em.getRepository(MessageModel);
};

export const connect = async () => {
  connection = await MikroORM.init<PostgreSqlDriver>(databaseConfig);
  initRepositories();
};

export const close = async () => {
  await connection.close();
};

export const save = async (entity: Partial<unknown>) => {
  await connection.em.persistAndFlush(entity);
};

export { connection, repositories };
