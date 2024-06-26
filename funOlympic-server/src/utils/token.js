import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ACCESSTOKENEXPIRETIME = process.env.ACCESSTOKENEXPIRETIME;
const REFRESHTOKENEXPIRETIME = process.env.REFRESHTOKENEXPIRETIME;

/**
 * Generate jwt accessToken
 * @param(string) id
 * @param(string) roles
 * @param(string) email
 *
 * @returns ({access, referesh})
 */
function generateTokens(fields) {
  const accessToken = jwt.sign(fields, JWT_SECRET_KEY, {
    expiresIn: ACCESSTOKENEXPIRETIME,
  });

  const refereshToken = jwt.sign(fields, JWT_SECRET_KEY, {
    expiresIn: REFRESHTOKENEXPIRETIME,
  });
  return {
    accessToken,
    refereshToken,
  };
}

export { generateTokens };
