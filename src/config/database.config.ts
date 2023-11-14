/* eslint-disable node/no-process-env */
export const databaseConfig = {
  database: process.env.DATABASE_NAME ?? 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT ?? 5_434,
  user: process.env.DATABASE_USER ?? 'postgres',
};
/* eslint-enable node/no-process-env */
