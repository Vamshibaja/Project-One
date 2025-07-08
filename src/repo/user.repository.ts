import IUser from "../interfaces/userModel.interface";
import UserModel from "../models/user.model";

class UserRepo {
  async registerUser(userData: IUser) {
    try {
      const result = await UserModel.create(userData);
      console.log("Result is :", result);
      return result;
    } catch (error) {
      console.log("error is ->", error);
      throw new Error("Error occured while creating user");
    }
  }
  async getUser(userName: String) {
    try {
      const user = await UserModel.findOne({ userName });
      if (!user) {
        return true;
      }
      return false;
    } catch (error) {
      console.log("error while fetching user from DB");
      throw new Error("Error while fetching user from DB");
    }
  }
  async getUserData(userName: String) {
    try {
      const user = await UserModel.findOne({ userName });
      if (user) {
        return user;
      }
      return user;
    } catch (error) {
      console.log("error while fetching user from DB");
      throw new Error("Error while fetching user data from DB");
    }
  }
}
export default new UserRepo();
