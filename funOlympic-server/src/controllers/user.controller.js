import * as userService from "../services/user.js";
import { successResponse } from "../utils/successResponse.js";

const getAllUser = async (req, res) => {
  const user = await userService.getAllUser();
  res.json(successResponse(user));
};

const createUser = async (req, res) => {
  const data = req.body;
  const user = await userService.createUser(data);
  res.json(successResponse(user));
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.json(successResponse(user));
};

export { getAllUser, createUser, getUserById };
