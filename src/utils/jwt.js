import jwt from "jsonwebtoken";

import { setCookie } from "./helper.js";

export const signJwt = (payload, res) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRATION || "1h";

  const token = jwt.sign(payload, secret, { expiresIn });

  setCookie(res, "session-token", token);
};

export const verifyJwt = (token) => {
  const secret = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
