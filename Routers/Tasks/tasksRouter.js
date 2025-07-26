import express from "express";
import { CreateTask } from "../../Controller/Tasks/CreateTask.js";
import { Validate } from "../../Middleware/Validates.js";
import { createTaskSchema, GetTaskSchema } from "../../Schemas/TaskSchema.js";
import { GetTask } from "../../Controller/Tasks/GetTask.js";

const router = express.Router();

router.route("/create-task").post(Validate(createTaskSchema), CreateTask);
router.route("/get-task/:user_idgit ").get(Validate(GetTaskSchema), GetTask);

export default router;
