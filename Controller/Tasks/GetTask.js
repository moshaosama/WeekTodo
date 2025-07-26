import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";
import { Task_key } from "../../utils/CreateKey.js";
import { DB } from "../../utils/connectdataBase.js";

export const GetTask = async (req, res) => {
  try {
    const { user_id, day_id } = req.params;
    if (!user_id) {
      errorResponse(res, 404, "user_id is required");
    }
    const client = await initialConnectionRedis();
    const Task_Keys = Task_key(day_id);
    const isExist = await client.exists(Task_Keys);
    if (isExist) {
      const data = await client.lRange(Task_Keys, 0, -1);
      successResponse(res, "Get Data Seccessfully", data);
    } else {
      const QueryGetTask =
        "SELECT * FROM tasks WHERE user_id = ? AND day_id = ?";
      const ValueGetTask = [user_id, day_id];

      const [result] = await DB.promise().query(QueryGetTask, ValueGetTask);

      successResponse(res, "get Data Successfully", result);
    }
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
