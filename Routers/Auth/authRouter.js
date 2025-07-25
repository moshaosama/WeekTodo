import express from "express";
import { SignUp } from "../../Controller/Auth/signUp.js";
import { Validate } from "../../Middleware/Validates.js";
import { SignUpSchema } from "../../Schemas/UserSchemas.js";
import { setBcryption } from "../../Middleware/bcryption.js";

const router = express.Router();

router.route("/").post(Validate(SignUpSchema), setBcryption, SignUp);

export default router;
