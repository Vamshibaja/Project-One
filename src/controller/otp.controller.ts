import { Request, Response, NextFunction } from "express";
import UserRepository from "../repo/user.repository";
import { generateOtp } from "../utils/generateOtp.util";
import { generateToken, verifyToken } from "../utils/jwt.util";
import jwtPayload from "../interfaces/jwtPayload.interface";
import { sendEmail } from "../services/email.service";

class Otp {
  generateOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { userName } = req.body;
      const isExist = await UserRepository.getUser(userName);
      if (!isExist) {
        return res.status(400).json({ msg: "User already exists please try login", success: false });
      }
      const otp = generateOtp(6).toString();
      const tokendata: string = generateToken({ userName, otp });
      const decodedToken = verifyToken(tokendata);
      console.log("decoded token", decodedToken);
      console.log(sendEmail(userName, "Otp to login has been sent your Email Account", otp));

      res.setHeader("tokendata", tokendata);
      res.status(200).json({ msg: "Enter the otp that has been sent to email...expires in 5 minutes", otp: otp });
    } catch (error) {
      console.log("Error while generating otp", error);
      next(error);
    }
  };
  verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { otp } = req.body;
      let token: string = req.headers.tokendata as string;
      // console.log("req is ->", req);
      console.log("req headers->", req.headers);
      console.log("tokendata is->", token);
      const decodedToken: jwtPayload = verifyToken(token);
      if (decodedToken.otp !== otp) {
        return res.status(401).json({ msg: "Token mismatch please try again" });
      }
      console.log("decode token in verify api ->", decodedToken);
      token = generateToken({ userName: decodedToken.userName, otp: " " });
      res.setHeader("tokendata", token);
      res.status(200).json({ msg: "otp verified successfully please set your password", email: decodedToken.userName });
    } catch (error) {
      console.log("error occured while verifying otp");
      next(error);
    }
  };
}
export default new Otp();
