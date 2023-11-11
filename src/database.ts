import { PrismaClient } from '@prisma/client';

export { type Chat, type User } from '@prisma/client';

export const database = new PrismaClient();

export const userModel = database.user;
export const chatModel = database.chat;
export const messageModel = database.message;
