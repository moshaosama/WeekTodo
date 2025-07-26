import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";
import { Task_key } from "../../utils/CreateKey.js";
import { DB } from "../../utils/connectdataBase.js";

export const GetTask = async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req.params;
    if (!user_id) {
      errorResponse(res, 404, "user_id is required");
    }
    const client = await initialConnectionRedis();
    const Task_Keys = await Task_key(data.day_id);
    const isExist = await client.exists(Task_Keys);
    if (isExist) {
      const data = await client.lRange(Task_Keys, 0, -1);
      successResponse(res, "Get Data Seccessfully", data);
    } else {
      const QueryGetTask =
        "SELECT * FROM tasks WHERE user_id = ? AND day_id = ?";
      const ValueGetTask = [user_id, data.day_id];

      const [result] = await DB.promise().query(QueryGetTask, ValueGetTask);

      successResponse(res, "get Data Successfully", result);
    }
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
