import { MessageController } from '@/controllers/message.controllers.js';
import { validate } from '@/middlewares/validate.middleware.js';
import { createMessageSchema } from '@/schemas/message.schema.js';
import express from 'express';

const router = express.Router();

router.get('/:routineId', MessageController.getByRoutine);
router.post('/', validate(createMessageSchema), MessageController.create);

export default router;
