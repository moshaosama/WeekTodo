import Joi from "joi";

export const CreateCustomTaskSchema = Joi.object({
  Title: Joi.string().required(),
});
