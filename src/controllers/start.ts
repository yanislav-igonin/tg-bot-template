import { Context } from 'telegraf';

export default async (ctx: Context): Promise<void> => {
  ctx.reply(`${new Date().toLocaleString()} - start`);
};
