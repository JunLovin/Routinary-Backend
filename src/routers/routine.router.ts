import { RoutineController } from '@/controllers/routine.controller.js';
import express from 'express';

const router = express.Router();

router.get('/me', RoutineController.getCurrentRoutines);
router.get('/:routineId', RoutineController.getById);
router.delete('/:routineId', RoutineController.delete);

export default router;
