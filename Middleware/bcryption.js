import bcrypt from "bcryptjs";
import { errorResponse } from "../utils/responses.js";

export const setBcryption = async (req, res, next) => {
  try {
    let { Password } = req.body;

    if (!Password) {
      errorResponse(res, 404, "Password is required");
    }

    const hashPassword = await bcrypt.hash(Password, 12);

    req.body.Password = hashPassword;
    next();
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
