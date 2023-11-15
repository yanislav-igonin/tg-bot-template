import { replies } from '@/replies';
import { type BotContext } from 'context';
import { type Filter } from 'grammy';

export const textController = async (
  context: Filter<BotContext, 'message:text'>,
) => {
  const { user, chat } = context.state;
  const { message } = context;
  const text = message.text;
  const { message_id: replyToMessageId } = context.message;

  const newMessage = context.repositories.message.create({
    chat: chat.id,
    text,
    tgId: replyToMessageId.toString(),
    user: user.id,
  });
  await context.repositories.save(newMessage);

  try {
    const replyText = `Echo: ${text}`;
    const botReply = await context.reply(replyText, {
      reply_to_message_id: replyToMessageId,
    });
    const replyMessage = context.repositories.message.create({
      chat: chat.id,
      text: replyText,
      tgId: botReply.message_id.toString(),
      user: 1,
    });
    await context.repositories.save(replyMessage);
  } catch (error) {
    await context.reply(replies.error);
    throw error;
  }
};
