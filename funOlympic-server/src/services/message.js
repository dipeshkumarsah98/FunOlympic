import db from "../config/db.js";

const createMessage = async (data) => {
  const { messageType, userId, chatId, commentId } = data;
  return await db.message.create({
    data: {
      messageType,
      user_id: userId,
      livechat_id: chatId,
      comment_id: commentId,
    },
  });
};

const getMessages = async () => {
  return await db.message.findMany({});
};

export { createMessage, getMessages };
