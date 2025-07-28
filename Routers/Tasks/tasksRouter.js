import express from "express";
import { CreateTask } from "../../Controller/Tasks/CreateTask.js";
import { Validate } from "../../Middleware/Validates.js";
import { createTaskSchema } from "../../Schemas/TaskSchema.js";
import { GetTask } from "../../Controller/Tasks/GetTask.js";
import { getTaskByid } from "../../Controller/Tasks/getTaskById.js";

const router = express.Router();

router.route("/create-task").post(Validate(createTaskSchema), CreateTask);
router.route("/get-task/:user_id/:day_id").get(GetTask);
router.route("/get-task-by-id/:day_id/:task_id").get(getTaskByid);

export default router;
