import ValidationError from "../errors/validationError.error.js";
import { successResponse } from "../utils/successResponse.js";
import * as commentService from "../services/comment.js";

const createOne = async (req, res) => {
  const { ...details } = req.body;

  const commentResponse = await commentService.createComment({
    ...details,
  });
  res.json(successResponse(201, "Created", commentResponse));
};

const findOne = async (req, res) => {
  const { ...details } = req.body;

  const commentResponse = await commentService.getComments({ ...details });
  res.json(successResponse(200, "Ok", commentResponse));
};

export { createOne, findOne };
