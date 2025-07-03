import e, { NextFunction, Response, Request } from "express";
import userRepository from "../repo/user.repository";
class UserController {
  registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userData = req.body;
      const result = await userRepository.registerUser(userData);
      return res.status(201).json({ success: true, msg: "User registered successfully" });
    } catch (error) {
      console.log("error while registering user");
      next(error);
    }
  };
}
export default new UserController();
