import { Days } from "../../Constants/Days.js";
import { DB } from "../../utils/connectdataBase.js";
import { Days_Details_Key, Days_Key, User_Key } from "../../utils/CreateKey.js";
import { initialConnectionRedis } from "../../utils/rediusConnection.js";
import { errorResponse, successResponse } from "../../utils/responses.js";

export const SignUp = async (req, res) => {
  try {
    const data = req.body;
    const client = await initialConnectionRedis();

    const QueryCreateUser =
      "INSERT INTO auth_user(userName, Email, Password) VALUES (?,?,?)";
    const ValueCreateUser = [data.userName, data.Email, data.Password];
    const [result] = await DB.promise().query(QueryCreateUser, ValueCreateUser);

    const user_Key = User_Key(result.insertId);
    await client.hSet(user_Key, data);

    const DaysKey = Days_Key(result.insertId);
    const Days_DetailsKey = Days_Details_Key();
    const Value = Days.map((d) => d.day);
    const Query = "INSERT INTO days (dayName, user_id) VALUES (?,?)";

    await Promise.all(
      Days.map(async ({ day }) => {
        const [res] = await DB.promise().query(Query, [day, result.insertId]);
        await client.rPush(Days_DetailsKey, String(res.insertId));
      })
    );
    await client.rPush(DaysKey, Value);
    successResponse(res, "addedd Successfully", data);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
