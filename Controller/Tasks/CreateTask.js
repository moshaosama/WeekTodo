import { DB } from "../../utils/connectdataBase.js";
import { Task_key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const CreateTask = async (req, res) => {
  try {
    const data = req.body;
    const QueryCreateTask =
      "INSERT INTO tasks (task, day_id, user_id) VALUES (?,?,?)";
    const ValueCreateTask = [data.task, data.day_id, data.user_id];

    await DB.promise().query(QueryCreateTask, ValueCreateTask);

    const client = await initialConnectionRedis();
    const Task_Key = Task_key(data.day_id);
    await client.rPush(Task_Key, data.task);
    successResponse(res, "Added Successfully");
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
