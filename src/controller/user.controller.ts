import { NextFunction, Response, Request } from "express";
import userRepository from "../repo/user.repository";
import { generateOtp } from "../utils/generateOtp.util";
import OtpRepository from "../repo/otp.repository";
import userSchema from "../joi/schema/user.schema";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwt.util";
class UserController {
  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { password, re_enter_password } = req.body;
      let token: string = req.headers.tokendata as string;
      if (password !== re_enter_password) {
        return res.status(400).json({ msg: "Please enter both password and confirm passwords as same" });
      }
      const salt = await bcrypt.genSalt(10);
      const encodedPassword = await bcrypt.hash(password, salt);
      const decodedToken = verifyToken(token);
      // const userData = { userName: decodedToken.userName, password: encodedPassword };
      const result = await userRepository.registerUser({ userName: decodedToken.userName, password: encodedPassword });
      // token = generateToken({ userName: decodedToken.userName, otp: "" });

      return res.status(201).json({ success: true, msg: "User registered successfully" });
    } catch (error) {
      console.log("error while registering user");
      next(error);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        console.log("error in joi validator", error.message);
      }
      const { userName, password } = req.body;
      const userData = await userRepository.getUserData(userName);
      const encodedPassword = userData!.password;
      const match = await bcrypt.compare(password, encodedPassword);

      if (!match) {
        return res.status(401).json({ msg: "Invalid credentials", success: false });
      }
      const token = generateToken({ userName, otp: " " });
      res.setHeader("tokendata", token);
      console.log("User login success");
      return res.status(200).json({ msg: "User login successfull" });
    } catch (error) {
      console.log("error occured while trying to  login");
      next(error);
    }
  };
}
export default new UserController();
