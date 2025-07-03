import IUser from "../interfaces/userModel.interface";
import userModel from "../models/user.model";
import mongoose from "mongoose";

class UserRepo {
  async registerUser(userData: IUser) {
    try {
      return await userModel.create(userData);
    } catch (error) {
      throw new Error("Error occured while creating user");
    }
  }
}
export default new UserRepo();
