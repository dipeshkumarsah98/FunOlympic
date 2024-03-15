import db from "../config/db";

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

export { createComment, getComments };
