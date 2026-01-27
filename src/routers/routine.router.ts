import { RoutineController } from "@/controllers/routine.controllers.js";
import express from "express";

const router = express.Router();

router.get('/', RoutineController.getAll);
router.get('/me', RoutineController.getCurrentRoutines);
router.get('/:routineId', RoutineController.getById);
router.post('/create', RoutineController.create);
router.put('/:routineId', RoutineController.update);
router.delete('/:routineId', RoutineController.delete);

export default router;
