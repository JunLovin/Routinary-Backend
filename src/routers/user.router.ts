import { UserController } from "@/controllers/user.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get('/', authenticate,UserController.getAll);
router.get('/me', authenticate, UserController.getCurrentUser);
router.get('/:userId', authenticate,UserController.getById);
router.patch('/:userId', authenticate,UserController.update);
router.delete('/:userId', authenticate,UserController.delete);

export default router;
