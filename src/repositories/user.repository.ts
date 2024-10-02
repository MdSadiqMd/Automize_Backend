import { z } from "zod";
import jwt from "jsonwebtoken";

import { logger, serverConfig } from "../config";
import { prismaClient } from "../db";
import { SignupSchema } from "../types";

type SignupSchemaType = z.infer<typeof SignupSchema>;

class UserRepository {
    async createUser(UserData: SignupSchemaType) {
        const parsedData = SignupSchema.safeParse(UserData);
        if (!parsedData.success) throw new Error("Invalid data");

        try {
            const user = await prismaClient.user.create({
                data: {
                    name: parsedData.data.name,
                    email: parsedData.data.email,
                    password: jwt.sign(parsedData.data.password, serverConfig.JWT_PASSWORD),
                }
            });
            logger.info(`New User created: ${user.id}`);
            return user;
        } catch (error: any) {
            logger.error(`Error creating User: ${error}`);
        }
    }

    async loginUser(UserData: Partial<SignupSchemaType>) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: UserData.email,
                }
            });
            logger.info(`Login in Successfully: ${user}`);
            return user;
        } catch (error: any) {
            logger.error(`Error in Login User: ${UserData.email} with Error: ${error}`);
        }
    }

    async getUser(email: string) {
        try {
            const user = await prismaClient.user.findUnique({
                where: {
                    email: email
                }
            });
            if (!user) {
                logger.warn(`User with Email: ${email} not found`);
                return false;
            }
            logger.info(`User with Email: ${email} retrieved`);
            return user;
        } catch (error: any) {
            logger.error(`Error retrieving user with Email: ${email}: ${error}`);
        }
    }

    async getAllUsers() {
        try {
            const users = await prismaClient.user.findMany();
            logger.info(`Retrieved all users`);
            return users;
        } catch (error: any) {
            logger.error(`Error retrieving all users: ${error}`);
        }
    }

    async deleteUser(email: string) {
        try {
            const deleteUser = await prismaClient.user.delete({
                where: {
                    email: email
                }
            });
            if (!deleteUser) {
                logger.warn(`User with Email: ${email} not found for deletion`);
            }
            logger.info(`User with Email: ${email} deleted`);
            return deleteUser;
        } catch (error: any) {
            logger.error(`Error deleting user with Email: ${email}: ${error}`);
        }
    }
}

export default UserRepository;