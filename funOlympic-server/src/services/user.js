import db from "../config/db";

const createUser = async (user) => {
  return await db.users.create({ data: user });
};

const getUserById = async (id) => {
  return await db.users.findUnique({ where: { id } });
};

const updateUserById = async (id, user) => {
  return await db.users.update({ where: { id }, data: user });
};

const getAllUser = async () => {
  return await db.users.findMany({});
};

export { createUser, getAllUser, getUserById, updateUserById };
