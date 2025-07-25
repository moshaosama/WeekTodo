import Joi from "joi";

export const SignUpSchema = Joi.object({
  userName: Joi.string().required(),
  Email: Joi.string().required(),
  Password: Joi.string().min(5).max(15).required(),
});
