import { z } from "zod";

import { TaskCreateSchema } from "../types";

type TaskSchemaType = z.infer<typeof TaskCreateSchema>;

interface TaskRepository {
    createTask(id: string, TaskData: TaskSchemaType): Promise<any>;
    getTask(userId: number, taskId: string): Promise<any>;
    getAllTasks(userId: number): Promise<any>;
}

class TaskService {
    private TaskRepository: TaskRepository;

    constructor(TaskRepository: TaskRepository) {
        this.TaskRepository = TaskRepository;
    }

    async createTask(id: string, TaskData: TaskSchemaType): Promise<any> {
        const task = await this.TaskRepository.createTask(id, TaskData);
        return task;
    }

    async getTask(userId: number, taskId: string): Promise<any> {
        const task = await this.TaskRepository.getTask(userId, taskId);
        return task;
    }

    async getAllTasks(userId: number): Promise<any[]> {
        const tasks = await this.TaskRepository.getAllTasks(userId);
        return tasks;
    }
}

export default TaskService;