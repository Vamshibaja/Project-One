import Joi from "joi";

const otpValidateSchema = Joi.object({
  otp: Joi.string().required(),
});
export default otpValidateSchema;
