import { type Database } from './types'; // this is the Database interface we defined earlier
import { databaseConfig } from 'config/database.config';
import { Kysely, PostgresDialect } from 'kysely';
// @ts-expect-error Dont give a fuck about DB driver types
import { Pool } from 'pg';

const dialect = new PostgresDialect({
  pool: new Pool({
    ...databaseConfig,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const database = new Kysely<Database>({
  dialect,
});
