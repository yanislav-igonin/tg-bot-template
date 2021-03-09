import { Context, NarrowedContext } from 'telegraf';
import { Update, Message } from 'telegraf/typings/telegram-types';

type TextContext = NarrowedContext<Context, {
  message: Update.New & Update.NonChannel & Message.TextMessage;
  update_id: number;
}>;

export const TextController = async (ctx: TextContext) => {
  const { message } = ctx;
  ctx.reply(`${new Date().toLocaleString()} - ${message.text}`);
};
