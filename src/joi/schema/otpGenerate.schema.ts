import Joi from "joi";

const otpGenerateSchema = Joi.object({
  userName: Joi.string().email().required(),
});
export default otpGenerateSchema;
