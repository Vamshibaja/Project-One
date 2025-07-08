import OtpModel from "../models/otp.model";
import IOtp from "../interfaces/otp.interface";
class OtpRepo {
  async saveOtp(otpData: IOtp) {
    try {
      const result = await OtpModel.create(otpData);
      console.log("result from otp collection is :", result);
      return result;
    } catch (error) {
      console.error("error in otp insertion to db ", error);
      throw new Error("Error in storing otp");
    }
  }
  async checkOtp(otp: number, userName: string) {
    try {
      return await OtpModel.findOne({ otp, userName });
    } catch (error) {
      console.log("error while fetching otp");
      throw new Error("Fetching ")
    }
  }
}
export default new OtpRepo();
