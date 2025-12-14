import crypto from "crypto";
import bcrypt from "bcryptjs";
import { EMAIL_VERIFY } from "@/config/constants";

export const createRawToken = () => {
  return crypto.randomBytes(EMAIL_VERIFY.RANDOM_BYTES_NUMBER).toString("hex");
};

export const hashToken = (createToken: string) => {
  return bcrypt.hash(createToken, EMAIL_VERIFY.HASH_NUMBER);
};

export const compareToken = (paramsToken: string, verifyToken: string) => {
  return bcrypt.compare(paramsToken, verifyToken);
};
