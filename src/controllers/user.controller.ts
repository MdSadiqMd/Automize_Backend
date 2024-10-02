import { Request, Response, NextFunction } from "express";

import { UserService } from "../services";
import { UserRepository } from "../repositories";
import { StatusCodes } from "http-status-codes";

const userService = new UserService(new UserRepository());

async function createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'New User Created Succesfully',
            error: {},
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}

async function loginUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const user = await userService.loginUser(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'User logged in Succesfully',
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { email } = req.body;
        const user = await userService.getUser(email);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "User Fetched",
            error: {},
            data: user
        });
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const users = await userService.getAllUsers();
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "All Users Fetched",
            error: {},
            data: users
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { email } = req.body;
        const deleteUser = await userService.deleteUser(email);
        return res.status(StatusCodes.OK).json({
            success: "true",
            message: "User Deleted",
            error: {},
            data: deleteUser
        });
    } catch (error) {
        next(error);
    }
}

export default {
    createUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser
};