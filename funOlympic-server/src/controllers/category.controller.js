import ValidationError from "../errors/validationError.error.js";
import { successResponse } from "../utils/successResponse.js";
import * as categoryService from "../services/category.js";

const findOne = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ValidationError("Id is required", "Id is required");

  const category = await categoryService.getCategoryById(id);
  res.json(successResponse(200, "Ok", category));
};

const findAll = async (req, res) => {
  const categories = await categoryService.getAllCategory();
  res.json(successResponse(200, "Ok", categories));
};

const createOne = async (req, res) => {
  const { ...details } = req.body;

  const category = await categoryService.createCategory({
    ...details,
  });
  res.json(successResponse(201, "Created", category));
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ValidationError("Id is required", "Id is required");

  const { ...details } = req.body;
  const category = await categoryService.updateCategoryById(id, {
    ...details,
  });
  res.json(successResponse(200, "Ok", category));
};

export { findOne, findAll, createOne, updateOne };
