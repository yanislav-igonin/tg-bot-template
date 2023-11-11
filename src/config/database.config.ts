import { valueOrThrow } from '@/values';
import { type Options } from '@mikro-orm/core';
import { type PostgreSqlDriver } from '@mikro-orm/postgresql';

/* eslint-disable node/no-process-env */
export const databaseConfig: Options<PostgreSqlDriver> = {
  clientUrl: valueOrThrow(process.env.DATABASE_URL, 'DATABASE_URL is required'),
  entities: ['../../dist/database/models'],
  entitiesTs: ['../database/models'],
  type: 'postgresql',
};
/* eslint-enable node/no-process-env */

export default databaseConfig;
