import { Context } from 'telegraf';

export const TextController = async (ctx: Context) => {
  const message = ctx.update.message?.text;
  ctx.reply(`${new Date().toLocaleString()} - ${message}`);
};
