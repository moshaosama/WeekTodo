import Joi from "joi";

export const GetDaysSchema = Joi.object({
  user_id: Joi.number().required(),
});
