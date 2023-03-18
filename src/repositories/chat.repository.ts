import { type Chat } from '@/database';
import { database } from '@/database';

export const create = async (data: Omit<Chat, 'createdAt' | 'isAllowed'>) =>
  await database.chat.create({ data });

export const get = async (id: string) =>
  await database.chat.findUnique({ where: { id } });
