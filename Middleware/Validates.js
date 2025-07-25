import { errorResponse } from "../utils/responses.js";

export const Validate = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body);

    if (error) {
      errorResponse(res, 404, error);
    }
    next();
  };
};
