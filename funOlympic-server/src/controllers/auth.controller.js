import ValidationError from "../errors/validationError.error.js";
import * as userService from "../services/user.js";
import { successResponse } from "../utils/successResponse.js";

const signUp = async (req, res) => {
  const { ...details } = req.body;
  // const user = await userService.createUser({
  // ...details,
  // });

  res.json(successResponse(200, "Ok", details));
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (user)
    throw new ValidationError(
      "Invalid email or password",
      "Invalid email or password",
    );

  const isCorrectPassword = false;

  if (isCorrectPassword)
    throw new ValidationError(
      "Invalid email or password",
      "Invalid email or password",
    );

  // create jwt and sent to user

  res.json(
    successResponse(200, "Ok", {
      access: "abcd",
      refresh: "xyz",
    }),
  );
};

export { signUp, signIn };
