import Joi from "joi";
const passwordSchema = Joi.object({
  newPassword: Joi.string().required().min(6).max(20),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match with New Password" }),
});
