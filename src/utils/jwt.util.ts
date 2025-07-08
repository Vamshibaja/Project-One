import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import jwtPayload from "../interfaces/jwtPayload.interface";
import dotenv from "dotenv";
import { token } from "morgan";
import { Err } from "joi";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
  throw new Error(" No secret key is provided ");
}
export const generateToken = (payload: jwtPayload): string => {
  console.log("token generating.......", payload);
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5M" });
};

export const verifyToken = (token: string): jwtPayload => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as jwtPayload;
    console.log("Valid token->", decodedToken);
    return decodedToken;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error("TokenExpiredError");
    } else if (error instanceof JsonWebTokenError) {
      throw new Error("Invalid Token");
    } else {
      console.log("unknown error=>", error);
      throw new Error("Unknown error");
    }
  }
};
