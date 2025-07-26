import { DB } from "../../utils/connectdataBase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../../utils/responses.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const Login = async (req, res) => {
  try {
    const data = req.body;
    const QuerygetEmail = "SELECT * FROM auth_user WHERE Email = ?";
    const ValueGetEmail = [data.Email];

    const [rows] = await DB.promise().query(QuerygetEmail, ValueGetEmail);
    const user = rows[0];
    const Token = jwt.sign({ Email: user?.Email }, process.env.SECRET_MESSAGE);

    if (!user) {
      return errorResponse(res, 404, "Email not found");
    }

    const isPasswordValid = await bcrypt.compare(data.Password, user.Password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Password is not correct");
    }

    const Data = {
      ...data,
      Token,
    };

    successResponse(res, "found successfully", Data);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
