import mongoose from "mongoose";
import IOtp from "../interfaces/otp.interface";

class Otp {
  private otpModel: mongoose.Schema<IOtp>;
  constructor() {
    this.otpModel = new mongoose.Schema(
      {
        otp: { type: String, required: true },
        userName: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );
  }
  getModel() {
    return mongoose.model<IOtp>("Otp", this.otpModel);
  }
}
export default new Otp().getModel();
