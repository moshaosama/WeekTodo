import express from "express";
import { CreateCustomTask } from "../../Controller/CustomTask/CreateCustomTask.js";
import { GetCustomTasks } from "../../Controller/CustomTask/GetCustomTasks.js";
import { DeleteCustomTask } from "../../Controller/CustomTask/DeleteCustomTask.js";

const router = express.Router();

router.route("/create-custom-task").post(CreateCustomTask);
router.route("/get-custom-task").get(GetCustomTasks);
router.route("/delete-custom-task/:customTask_id").delete(DeleteCustomTask);

export default router;
