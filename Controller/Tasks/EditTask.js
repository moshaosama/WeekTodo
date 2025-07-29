import { DB } from "../../utils/connectdataBase.js";
import { Task_key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const EditTask = async (req, res) => {
  try {
    const { task, index_db, Notes, subTask } = req.body;
    const { task_id, day_id } = req.params;

    if (!task || index_db === undefined) {
      return errorResponse(res, 400, "task and index_db are required");
    }

    const QueryUpdateTask = "UPDATE tasks SET task = ? WHERE id = ?";
    const ValueUpdateTask = [task, task_id];

    const [result] = await DB.promise().query(QueryUpdateTask, ValueUpdateTask);

    if (result.affectedRows === 0) {
      return errorResponse(res, 404, "Task not found in database");
    }

    const QueryCreateDetailsTask =
      "INSERT INTO details_task (Notes, subTask, task_id) VALUES (?, ?,?)";
    const ValueCreateDetailsTask = [Notes, subTask, task_id];

    await DB.promise().query(QueryCreateDetailsTask, ValueCreateDetailsTask);

    const client = await initialConnectionRedis();
    const Task_keys = Task_key(day_id);

    await client.lSet(Task_keys, index_db, task);

    successResponse(res, 200, "Edited successfully");
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
