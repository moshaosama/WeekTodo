import { User_Key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const SignUp = async (req, res) => {
  try {
    const data = req.body;
    const id = Math.random() * 10;
    const client = await initialConnectionRedis();
    const user_Key = User_Key(id);
    await client.hSet(user_Key, data);
    successResponse(res, "addedd Successfully", data);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
