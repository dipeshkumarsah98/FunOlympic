import db from "../config/db.js";

const createOne = async (data) => {
  const {
    title,
    description,
    thumbnail,
    published,
    liveChatEnabled,
    streamLink,
    categoryId,
    time,
  } = data;
  const event = await db.events.create({
    data: {
      eventTitle: title,
      description,
      thumbnail,
      time,
      published,
      liveChatEnabled,
      streamLink,
      category_id: +categoryId,
    },
  });
  return event;
};

const findOne = async (id) => {
  return await db.events.findUnique({ where: { id } });
};

const findAll = async () => {
  return await db.events.findMany({});
};

const updateOne = async (id, data) => {
  return await db.events.update({ where: { id: +id }, data });
};

const deleteOne = async (id) => {
  return await db.events.delete({ where: { id: +id } });
};

export { createOne, findOne, findAll, updateOne, deleteOne };
