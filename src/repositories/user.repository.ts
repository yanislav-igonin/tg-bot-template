import { config } from '@/config';
import { type User } from '@/database';
import { database } from '@/database';

export const get = async (id: string) =>
  await database.user.findUnique({ where: { id } });

export const create = async (data: Omit<User, 'createdAt' | 'isAllowed'>) =>
  await database.user.create({ data });

export const hasAccess = (username: string) =>
  config.allowedUsernames.includes(username);
