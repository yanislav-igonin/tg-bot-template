import { valueOrThrow } from '@/values';
import { type Options } from '@mikro-orm/core';
import { type PostgreSqlDriver } from '@mikro-orm/postgresql';

/* eslint-disable node/no-process-env */
export const databaseConfig: Options<PostgreSqlDriver> = {
  clientUrl: valueOrThrow(process.env.DATABASE_URL, 'DATABASE_URL is required'),
  entities: ['./dist/database/models'],
  entitiesTs: ['./src/database/models'],
  migrations: {
    // fileName: (timestamp: string, name?: string) => {
    //   // force user to provide the name, otherwise we would end up with `Migration20230421212713_undefined`
    //   if (!name) {
    //     throw new Error(
    //       'Specify migration name via `mikro-orm migration:create --name=...`',
    //     );
    //   }

    //   return `${timestamp}_${name}`;
    // },
    path: './src/database/migrations',
  },
  type: 'postgresql',
};
/* eslint-enable node/no-process-env */

export default databaseConfig;
