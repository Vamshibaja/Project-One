import express, { Router } from "express";
import userController from "../controller/user.controller";
class UserRouter {
  public router: Router;
  constructor() {
    this.router = express.Router();
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.post("/signUp", userController.registerUser);
  }
}
export default new UserRouter().router;
