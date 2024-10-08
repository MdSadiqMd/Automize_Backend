import express from 'express';

import triggerRouter from './trigger.routes';
import actionRouter from './action.routes';
import userRouter from './auth.routes';
import taskRouter from './task.routes';

const v1Router = express.Router();

v1Router.use('/triggers', triggerRouter);
v1Router.use('/actions', actionRouter);
v1Router.use('/users', userRouter);
v1Router.use('/task', taskRouter);

export default v1Router;