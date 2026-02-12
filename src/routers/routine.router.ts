import { RoutineController } from '@/controllers/routine.controller.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { createRoutineSchema } from '@/schemas/routine.schema.js';
import express from 'express';

const router = express.Router();

router.get('/me', RoutineController.getCurrentRoutines);
router.post('/', validate(createRoutineSchema), RoutineController.create);
router.get('/:routineId', RoutineController.getById);
router.delete('/:routineId', RoutineController.delete);

export default router;
