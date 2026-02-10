import { MessageController } from '@/controllers/message.controllers';
import { validate } from '@/middlewares/validate.middleware';
import { createMessageSchema } from '@/schemas/message.schema';
import express from 'express';

const router = express.Router();

router.get('/:routineId', MessageController.getByRoutine);
router.post('/', validate(createMessageSchema), MessageController.create);

export default router;
