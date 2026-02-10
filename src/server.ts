import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import authRouter from '@/routers/auth.router.js';
import userRouter from '@/routers/user.router.js';
import routineRouter from '@/routers/routine.router.js';
import messageRouter from '@/routers/message.router.js';

import { errorHandler } from './handlers/errorHandler.js';
import { authenticate } from './middlewares/auth.middleware.js';

const PORT = process.env.PORT || 3000;
const app = express();

// INFO: Middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}));

// INFO: Routers

app.use('/api/auth', authRouter);
app.use('/api/users', authenticate, userRouter);
app.use('/api/routines', authenticate, routineRouter);
app.use('/api/messages', authenticate, messageRouter);

app.use(errorHandler);

// NOTE: Just for testing
app.get('/', (_, res) => {
  res.json({ success: 'The API is working!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
