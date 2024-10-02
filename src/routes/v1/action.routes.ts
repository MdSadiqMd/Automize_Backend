import express from "express";

import { actionController } from "../../controllers";

const actionRouter = express.Router();

actionRouter.get("/", actionController.availableActions);

export default actionRouter;