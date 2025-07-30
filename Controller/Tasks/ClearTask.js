import { DB } from "../../utils/connectdataBase.js";
import { Task_key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const ClearTask = async (req, res) => {
  try {
    const { day_id } = req.params;
    if (!day_id) {
      errorResponse(res, 404, "day_id is required");
    }
    const QueryClearAllTask = "DELETE FROM tasks WHERE day_id = ?";
    const ValueClearAllTasks = [day_id];

    await DB.promise().query(QueryClearAllTask, ValueClearAllTasks);

    const client = await initialConnectionRedis();
    const taskKey = Task_key(day_id);
    await client.del(taskKey);

    successResponse(res, 200, "Deleted Successfully");
  } catch (err) {}
};
