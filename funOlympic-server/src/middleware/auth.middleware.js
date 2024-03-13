import UnauthorizedError from "../errors/unauthorizedError.error.js";
import Jwt from "jsonwebtoken";

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const validateToken = (req, res, next) => {
  // getting token from header
  const key = process.env.JWT_SECRET_KEY;
  const authHeader = req.headers.authorization;
  // the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (!token) {
    throw new UnauthorizedError(
      "Access Denied: No token provided.",
      "Access Denied: Please provide valid credentials or contact support for assistance with API authorization.",
    );
  }
  Jwt.verify(token, key, (err, user) => {
    // if token is invalid or expired
    if (err) {
      throw new UnauthorizedError(
        "Access Denied: Token is invalid or expired.",
        "Access Denied: Please provide valid token or generate new one.",
      );
    } else {
      // provided token is valid
      req.user = user;
      next();
    }
  });
  return null;
};

/**
 * @DESC Check user role
 * @param {string} role - The role of a user
 *
 */
const checkRole = (role) => async (req, res, next) => {
  let user = req.user;

  if (!user) {
    throw new UnauthorizedError(
      "Access Denied: No token provided.",
      "Access Denied: Please provide valid credentials or contact support for assistance with API authorization.",
    );
  }

  console.log(
    `Role of user ${user.email} is ${user.roles.toLocaleLowerCase()}`,
  );

  if (
    user.roles.toLocaleLowerCase() === "admin" ||
    user.roles.toLocaleLowerCase() === role
  ) {
    next();
  } else {
    throw new UnauthorizedError(
      "Sorry you do not have access to this route",
      "Sorry you do not have access to this route",
    );
  }
};

export { validateToken, checkRole };