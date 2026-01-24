import { AuthController } from "@/controllers/auth.controllers.js";
import express from "express";

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
