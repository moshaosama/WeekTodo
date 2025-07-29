import { DB } from "../../utils/connectdataBase.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const GetCustomTasks = async (req, res) => {
  try {
    const GetCustomTasks = "SELECT * FROM custom_task";
    const [result] = await DB.promise().query(GetCustomTasks);

    successResponse(res, 200, result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
