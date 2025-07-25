import express from "express";
import { createDays } from "../../Controller/Days/createDays.js";

const router = express.Router();

router.route("/").post(createDays);

export default router;
