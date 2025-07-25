import express from "express";
import { SignUp } from "../../Controller/Auth/signUp.js";
import { Validate } from "../../Middleware/Validates.js";
import { LoginSchema, SignUpSchema } from "../../Schemas/UserSchemas.js";
import { setBcryption } from "../../Middleware/bcryption.js";
import { Login } from "../../Controller/Auth/login.js";

const router = express.Router();

router.route("/signup").post(Validate(SignUpSchema), setBcryption, SignUp);
router.route("/login").post(Login);

export default router;
