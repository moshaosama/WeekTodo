import Joi from "joi";

export const createTaskSchema = Joi.object({
  task: Joi.string().min(1).required(),
  day_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

export const GetTaskSchema = Joi.object({
  day_id: Joi.number().required(),
});
