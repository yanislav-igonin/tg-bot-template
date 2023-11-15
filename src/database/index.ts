import { ChatModel, MessageModel, UserModel } from './models';
import { databaseConfig } from '@/config';
import { LoadStrategy, MikroORM } from '@mikro-orm/core';
import {
  type EntityManager,
  type PostgreSqlDriver,
} from '@mikro-orm/postgresql';

// eslint-disable-next-line import/no-mutable-exports
let connection: MikroORM<PostgreSqlDriver>;

export const connect = async () => {
  connection = await MikroORM.init<PostgreSqlDriver>({
    ...databaseConfig,
    debug: true,
    loadStrategy: LoadStrategy.JOINED,
  });
};

export const close = async () => {
  await connection.close();
};

const initRepositories = (em: EntityManager<PostgreSqlDriver>) => ({
  chat: em.getRepository(ChatModel),
  message: em.getRepository(MessageModel),
  async save(entity: Partial<unknown>) {
    await em.persistAndFlush(entity);
  },
  user: em.getRepository(UserModel),
});

export const getRepositories = () => {
  const fork = connection.em.fork();
  return initRepositories(fork);
};
