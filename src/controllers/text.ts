import { ContextMessageUpdate } from 'telegraf';

export default async (ctx: ContextMessageUpdate): Promise<void> => {
  const message = ctx.update.message ? ctx.update.message.text : 'text';
  ctx.reply(`${new Date().toLocaleString()} - ${message}`);
};
