import { ContextMessageUpdate } from 'telegraf';

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  ctx.reply(`${new Date().toLocaleString()} - start`);
};
