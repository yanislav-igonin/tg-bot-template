/* eslint-disable no-console */
import { type Database } from './types';
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
// @ts-expect-error Dont give a fuck about DB driver types
import { Pool } from 'pg';

const migrateToLatest = async () => {
  const database = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: 'kysely_test',
        host: 'localhost',
      }),
    }),
  });

  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, 'migrations'),
      path,
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (results)
    for (const it of results) {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    // eslint-disable-next-line node/no-process-exit
    process.exit(1);
  }

  await database.destroy();
};

void migrateToLatest();
/* eslint-enable no-console */
