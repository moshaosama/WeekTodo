import { Days } from "../../Constants/Days.js";
import { DB } from "../../utils/connectdataBase.js";
import { Days_Key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const createDays = async (req, res) => {
  try {
    const client = await initialConnectionRedis();
    const id = 93; // userId
    // const DaysKey = Days_Key(id);

    const isExist = await client.exists("bits:days:93");

    if (isExist) {
      const rows = await client.lRange("bits:days:93", 0, -1);
      successResponse(res, "added successfully", rows);
    } else {
      const Value = Days.map((d) => d.day);
      const Query = "INSERT INTO days (dayName, user_id) VALUES (?,?)";
      const Value_1 = [Days.map((d) => d.day)[0], id];
      await DB.promise().query(Query, Value_1);
      await client.rPush("bits:days:93", Value);
      successResponse(res, "added successfullyasdasds", Value);
    }
  } catch (err) {
    errorResponse(res, 500, err);
  }
};
