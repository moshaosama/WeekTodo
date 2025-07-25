import { GetDaysSchema } from "../../Schemas/DaysSchema.js";
import { DB } from "../../utils/connectdataBase.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const GetDays = async (req, res) => {
  try {
    const { value, error } = GetDaysSchema.validate(req.params);

    if (error) {
      errorResponse(res, 404, error);
    }

    // console.log(value.user_id); 5

    const QueryGetDays = "SELECT * FROM days WHERE user_id = ?";
    const ValueGetDays = [value.user_id];

    const client = await initialConnectionRedis();
    const isExist = await client.exists(`bits:days:${value.user_id}`);

    if (isExist) {
      const data = await client.lRange(`bits:days:${value.user_id}`, 0, -1);
      successResponse(res, "get data successfully", data);
    } else {
      const [result] = await DB.query(QueryGetDays, ValueGetDays);
      successResponse(res, "get data successfully", result);
    }
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
