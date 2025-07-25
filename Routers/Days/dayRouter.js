import express from "express";
import { createDays } from "../../Controller/Days/createDays.js";
import { GetDays } from "../../Controller/Days/GetDays.js";

const router = express.Router();

router.route("/create_days").post(createDays);
router.route("/:user_id").get(GetDays);

export default router;
