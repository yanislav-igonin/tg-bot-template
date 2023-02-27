import { type User as UserType } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export const database = new PrismaClient();

export type User = UserType;
