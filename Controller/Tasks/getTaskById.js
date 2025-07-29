import { DB } from "../../utils/connectdataBase.js";
import { Task_key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const getTaskByid = async (req, res) => {
  try {
    const { day_id, task_id } = req.params;

    if (!day_id) {
      return errorResponse(res, 404, "day_id is not found");
    }

    const client = await initialConnectionRedis();
    const Tasks_Key = await Task_key(day_id);

    const isExist = await client.exists(Tasks_Key);
    const QueryGetTaskDetails = "SELECT *  FROM details_task WHERE task_id = ?";
    const ValueGetTaskDetails = [task_id];

    if (isExist === 1) {
      const data = await client.lRange(Tasks_Key, 0, -1);
      return successResponse(res, "Get Data Successfully (from Redis)", data);
    } else {
      const QueryGetTaskByid = "SELECT * FROM tasks WHERE id = ?";
      const ValueGetTaskByid = [task_id];
      const [result] = await DB.promise().query(
        QueryGetTaskByid,
        ValueGetTaskByid
      );
      return successResponse(res, 200, result);
    }
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
