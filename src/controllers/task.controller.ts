import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { TaskService } from "../services";
import { TaskRepository } from "../repositories";
import { logger } from "../config";

const taskService = new TaskService(new TaskRepository());

async function createTask(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const task = await taskService.createTask(req.params.id, req.body);
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'New Task Created Succesfully',
                error: {},
                data: task
            });
    } catch (error) {
        logger.error(`Error in Creating Task: ${error}`);
        next(error);
    }
}

async function getTask(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { userId } = req.body;
        const task = await taskService.getTask(userId, req.params.id);
        return res
            .status(StatusCodes.OK)
            .json({
                success: "true",
                message: "Task Fetched",
                error: {},
                data: task
            });
    } catch (error) {
        next(error);
    }
}

async function getAllTasks(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { userId } = req.body;
        const tasks = await taskService.getAllTasks(userId);
        return res
            .status(StatusCodes.OK)
            .json({
                success: "true",
                message: "All Tasks Fetched",
                error: {},
                data: tasks
            });
    } catch (error) {
        next(error);
    }
}

export default {
    createTask,
    getTask,
    getAllTasks
};