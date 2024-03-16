import db from "../config/db.js";

const createComment = async (detail) => {
  return await db.comments.upsert({
    create: {
      message: {
        connectOrCreate: {
          create: {
            body: detail?.body,
          },
        },
      },
      event_id: +detail?.eventId,
    },
  });
};

const getComments = async (eventId) => {
  return await db.comments.findMany({
    where: {
      event_id: +eventId,
    },
    include: {
      message: true,
    },
  });
};

const deleteComment = async (id) => {
  return await db.comments.delete({
    where: {
      id: +id,
    },
  });
};

export { createComment, getComments, deleteComment };
