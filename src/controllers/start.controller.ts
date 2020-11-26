import { Context } from 'telegraf';

export const StartController = async (ctx: Context) => {
  ctx.reply(`${new Date().toLocaleString()} - start`);
};
