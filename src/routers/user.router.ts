import { UserController } from "@/controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:userId', UserController.getById);
router.patch('/:userId', UserController.update);
router.delete('/:userId', UserController.delete);

export default router;
