import { PrismaClient } from '@prisma/client';

export { type Chat, type User } from '@prisma/client';

export const database = new PrismaClient();
