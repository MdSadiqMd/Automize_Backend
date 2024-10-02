import express from 'express';

import triggerRouter from './trigger.routes';

const v1Router = express.Router();

v1Router.use('/triggers', triggerRouter);

export default v1Router;