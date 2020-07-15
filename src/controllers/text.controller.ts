import { Context } from 'telegraf';

export const TextController = async (ctx: Context): Promise<void> => {
  const message = ctx.update.message?.text;
  ctx.reply(`${new Date().toLocaleString()} - ${message}`);
};
