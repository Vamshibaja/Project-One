import userModel from "../interfaces/userModel.interface";
import mongoose from "mongoose";

class User {
  private userSchema: mongoose.Schema<userModel>;

  constructor() {
    this.userSchema = new mongoose.Schema(
      {
        userName: { type: String, required: true },
        password: { type: String, required: true, minlength: 10 },
      },
      { timestamps: true }
    );
  }
  getModel() {
    return mongoose.model<userModel>("User", this.userSchema);
  }
}
export default new User().getModel();
