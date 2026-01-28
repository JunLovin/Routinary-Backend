import { AuthController } from "@/controllers/auth.controller.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "@/schemas/auth.schema.js";
import express from "express";

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
