import { RoutineController } from "@/controllers/routine.controllers.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get('/', authenticate, RoutineController.getAll);
router.get('/me', authenticate, RoutineController.getCurrentRoutines);
router.get('/:routineId', authenticate, RoutineController.getById);
router.post('/create', authenticate, RoutineController.create);
router.put('/:routineId', authenticate, RoutineController.update);
router.delete('/:routineId', authenticate, RoutineController.delete);

export default router;
