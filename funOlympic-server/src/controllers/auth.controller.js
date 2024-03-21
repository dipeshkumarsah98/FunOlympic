import { comparePassword } from "../utils/bcrypt.js";
import ValidationError from "../errors/validationError.error.js";
import * as userService from "../services/user.js";
import * as mailService from "../services/mailer.service.js";
import { successResponse } from "../utils/successResponse.js";
import { generateTokens } from "../utils/token.js";
import { generateOtp } from "../utils/otp.js";

const sendOtp = async (req, res) => {
  const { email, name } = req.body;
  const user = await userService.getUserByEmail(email);
  if (user) {
    throw new ValidationError("Email already exits", "Email already exits");
  }
  const otp = generateOtp();
  console.log("🚀 ~ sendOtp ~ otp:", otp);

  mailService.sendOtp({
    email,
    name,
    otp,
  });

  res.json(successResponse(200, "Ok", { message: "OTP sent to your email" }));
};

const signUp = async (req, res) => {
  const { token, ...details } = req.body;

  // check email is unique or not
  const userExist = await userService.getUserByEmail(details.email);

  if (userExist) {
    throw new ValidationError("Email already exits", "Email already exits");
  }

  const user = await userService.createUser({
    ...details,
  });

  const tokens = await generateTokens({
    id: user.id,
    roles: user.roles,
    email: user.email,
  });

  const { password, ...rest } = user;

  res.json(successResponse(200, "Ok", { user: { ...rest }, tokens }));
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user)
    throw new ValidationError(
      "Invalid email or password",
      "Invalid email or password"
    );

  const isCorrectPassword = await comparePassword(password, user.password);

  if (!isCorrectPassword)
    throw new ValidationError(
      "Invalid email or password",
      "Invalid email or password"
    );

  // create jwt and sent to user
  const tokens = generateTokens({
    id: user.id,
    roles: user.roles,
    email: user.email,
  });

  res.json(
    successResponse(200, "Ok", {
      tokens,
      user: {
        name: user.name,
        id: user.id,
        role: user.roles,
        email: user.email,
      },
    })
  );
};

export { signUp, signIn, sendOtp };
