import Joi from "joi";

const userSchema = Joi.object({
  userName: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20),
});
export default userSchema;
