import { RoutineController } from '@/controllers/routine.controller.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { createRoutineSchema, updateRoutineSchema } from '@/schemas/routine.schema.js';
import express from 'express';

const router = express.Router();

router.get('/me', RoutineController.getCurrentRoutines);
router.get('/:routineId', RoutineController.getById);
router.post('/generate', validate(createRoutineSchema), RoutineController.generate);
router.put('/:routineId', validate(updateRoutineSchema), RoutineController.update);
router.delete('/:routineId', RoutineController.delete);

export default router;
