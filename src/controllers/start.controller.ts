import { Context } from 'telegraf';

export const StartController = async (ctx: Context): Promise<void> => {
  ctx.reply(`${new Date().toLocaleString()} - start`);
};
