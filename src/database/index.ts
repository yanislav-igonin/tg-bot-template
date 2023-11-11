import { databaseConfig } from '@/config';
import { MikroORM } from '@mikro-orm/core';
import { type PostgreSqlDriver } from '@mikro-orm/postgresql'; // or any other driver package

// eslint-disable-next-line import/no-mutable-exports
let connection: MikroORM<PostgreSqlDriver>;

export const init = async () => {
  connection = await MikroORM.init<PostgreSqlDriver>(databaseConfig);
};

export { connection };
