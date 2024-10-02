import express from 'express';

import triggerRouter from './trigger.routes';
import actionRouter from './action.routes';

const v1Router = express.Router();

v1Router.use('/triggers', triggerRouter);
v1Router.use('/actions', actionRouter);

export default v1Router;