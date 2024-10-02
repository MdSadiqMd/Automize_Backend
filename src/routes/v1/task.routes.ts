import express from "express";

import { taskController } from "../../controllers";

const taskRouter = express.Router();

taskRouter.post("/", taskController.createTask);
taskRouter.get("/:taskId", taskController.getTask);
taskRouter.get("/", taskController.getAllTasks);

export default taskRouter;