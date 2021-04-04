import { Composer } from 'telegraf';

export const TextController = Composer.on('text', async (ctx) => {
  const { message } = ctx;
  ctx.reply(`${new Date().toLocaleString()} - ${message.text}`);
});
