import { DB } from "../../utils/connectdataBase.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const DeleteCustomTask = async (req, res) => {
  try {
    const { customTask_id } = req.params;

    if (!customTask_id) {
      errorResponse(res, 404, "data is required");
    }

    const QueryDeleteCustomTask = "DELETE FROM custom_task WHERE id = ?";
    const ValueDeleteCustomTask = [customTask_id];

    await DB.promise().query(QueryDeleteCustomTask, ValueDeleteCustomTask);

    successResponse(res, 200, "Deleted Successfully");
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
