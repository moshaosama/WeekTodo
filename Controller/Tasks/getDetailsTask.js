import { DB } from "../../utils/connectdataBase.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const GetTaskDetails = async (req, res) => {
  try {
    const { task_id } = req.params;
    if (!task_id) {
      errorResponse(res, 404, "data is required");
    }

    const QueryGetTaskDetails = "SELECT *  FROM details_task WHERE task_id = ?";
    const ValueGetTaskDetails = [task_id];

    const [result] = await DB.promise().query(
      QueryGetTaskDetails,
      ValueGetTaskDetails
    );

    successResponse(res, 200, result);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
