import express from "express";

import { triggerController } from "../../controllers";

const triggerRouter = express.Router();

triggerRouter.get("/", triggerController.availableTriggers);

export default triggerRouter;