import express from "express";
import { CreateCustomTask } from "../../Controller/CustomTask/CreateCustomTask.js";
import { GetCustomTasks } from "../../Controller/CustomTask/GetCustomTasks.js";

const router = express.Router();

router.route("/create-custom-task").post(CreateCustomTask);
router.route("/get-custom-task").get(GetCustomTasks);

export default router;
