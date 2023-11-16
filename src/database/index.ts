import * as schema from './schemas';
import { databaseConfig } from '@/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export * as operators from 'drizzle-orm';

export const queryClient = postgres(databaseConfig.dbCredentials);
export const database = drizzle(queryClient, { schema });
