import { randomInt } from "crypto";

export const generateOtp = (otpLength: number): number => {
  const otp = randomInt(100000, 10000000);
  console.log("otp is :", otp);
  return otp;
};
