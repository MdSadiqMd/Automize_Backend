import { z } from "zod";

import { logger, serverConfig } from "../config";
import { prismaClient } from "../db";
import { TaskCreateSchema } from "../types";

type TaskSchemaType = z.infer<typeof TaskCreateSchema>;

class TaskRepository {
    async createTask(id: string, TaskData: TaskSchemaType) {
        const parsedData = TaskCreateSchema.safeParse(TaskData);
        if (!parsedData.success) throw new Error("Invalid data");

        try {
            await prismaClient.$transaction(async tx => {
                const task = await prismaClient.task.create({
                    data: {
                        userId: parseInt(id),
                        triggerId: "",
                        actions: {
                            create: parsedData.data.actions.map((x, index) => ({
                                actionId: x.availableActionId,
                                sortingOrder: index,
                                metadata: x.actionMetadata
                            }))
                        }
                    }
                });

                const trigger = await tx.trigger.create({
                    data: {
                        triggerId: parsedData.data.availableTriggerId,
                        taskId: task.id,
                    }
                });

                await tx.task.update({
                    where: {
                        id: task.id
                    },
                    data: {
                        triggerId: trigger.id
                    }
                });
                logger.info(`New Task created with Id: ${task.id}`);
                return task.id;
            });
        } catch (error: any) {
            logger.error(`Error creating Task: ${error}`);
        }
    }

    async getTask(userId: number, taskId: string) {
        try {
            const task = await prismaClient.task.findFirst({
                where: {
                    id: taskId,
                    userId: userId
                },
                include: {
                    actions: {
                        include: {
                            type: true
                        }
                    },
                    trigger: {
                        include: {
                            type: true
                        }
                    }
                }
            });
            logger.info(`Task with Id: ${taskId} had retrived Succesfully`);
            return task;
        } catch (error: any) {
            logger.error(`Error Retriving Taks of User with UserId: ${userId} with Error ${error}`);
        }
    }

    async getAllTasks(userId: number) {
        try {
            const tasks = await prismaClient.task.findMany({
                where: {
                    userId: userId
                },
                include: {
                    actions: {
                        include: {
                            type: true
                        }
                    },
                    trigger: {
                        include: {
                            type: true
                        }
                    }
                }
            });
            logger.info(`All Tasks Retrived Succesfully`);
            return tasks;
        } catch (error: any) {
            logger.error(`Error retrieving all Tasks for userId: ${userId} with Error ${error}`);
        }
    }
}

export default TaskRepository;