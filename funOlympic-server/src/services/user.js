import { hashPassword } from "../utils/bcrypt.js";
import db from "../config/db.js";

const createUser = async (user) => {
  const { password, ...details } = user;
  const hashedPassword = await hashPassword(password);
  return await db.users.create({
    data: {
      password: hashedPassword,
      roles: "Admin",
      ...details,
    },
  });
};

const getUserByEmail = async (email) => {
  return await db.users.findFirst({ where: { email } });
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

export { getUserByEmail, createUser, getAllUser, getUserById, updateUserById };
