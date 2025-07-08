import express, { Router } from "express";
import UserController from "../controller/user.controller";
import OtpController from "../controller/otp.controller";
import userSchema from "../joi/schema/user.schema";
import { joiValidator } from "../joi/validate.joi";

class UserRouter {
  public router: Router;
  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/signUpAndSetPassword", UserController.registerUser);
    this.router.post("/login", joiValidator(userSchema), UserController.login);
    this.router.post("/verifyOTP", OtpController.verifyOtp);
    this.router.post("/otp", OtpController.generateOtp);
  }
}
export default new UserRouter().router;
