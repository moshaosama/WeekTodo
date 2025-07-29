import { DB } from "../../utils/connectdataBase.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const CreateCustomTask = async (req, res) => {
  try {
    const QueryCreateCustomTask = "INSERT INTO custom_task (Title) VALUES (?)";
    const ValueCreateCustomTask = ["Custom Task"];

    await DB.promise().query(QueryCreateCustomTask, ValueCreateCustomTask);

    successResponse(res, 200, "Added Successfully");
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
