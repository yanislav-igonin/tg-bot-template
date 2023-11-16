/* eslint-disable node/no-process-env */
// eslint-disable-next-line import/no-unassigned-import
import 'dotenv/config';
import { type Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    database: process.env.DATABASE_NAME ?? 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    user: process.env.DATABASE_USER ?? 'postgres',
  },
  driver: 'pg',
  out: 'src/database/migrations',
  schema: 'src/database/schemas/index.ts',
} satisfies Config;
