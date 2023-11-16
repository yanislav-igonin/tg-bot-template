import { database, queryClient } from '.';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const run = async () => {
  // This will run migrations on the database, skipping the ones already applied
  await migrate(database, { migrationsFolder: 'src/database/migrations' });

  // Don't forget to close the connection, otherwise the script will hang
  await queryClient.end();
};

run()
  // eslint-disable-next-line no-console
  .then(() => console.log('all pending migrations are applied'))
  // eslint-disable-next-line no-console
  .catch(console.error)
  // eslint-disable-next-line node/no-process-exit
  .finally(() => process.exit(0));
