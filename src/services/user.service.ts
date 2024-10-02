import { z } from "zod";

import { SignupSchema } from "../types";

type SignupSchemaType = z.infer<typeof SignupSchema>;

interface UserRepository {
    createUser(UserData: SignupSchemaType): Promise<any>;
    loginUser(UserData: Partial<SignupSchemaType>): Promise<any>;
    getUser(email: string): Promise<any>;
    getAllUsers(): Promise<any>;
    deleteUser(email: string): Promise<any>;
}

class UserService {
    private UserRepository: UserRepository;

    constructor(UserRepository: UserRepository) {
        this.UserRepository = UserRepository;
    }

    async createUser(UserData: SignupSchemaType): Promise<any> {
        const user = await this.UserRepository.createUser(UserData);
        return user;
    }

    async loginUser(UserData: Partial<SignupSchemaType>): Promise<any> {
        const user = await this.UserRepository.loginUser(UserData);
        return user;
    }

    async getUser(email: string): Promise<any[]> {
        const user = await this.UserRepository.getUser(email);
        return user;
    }

    async getAllUsers(): Promise<any[]> {
        const users = await this.UserRepository.getAllUsers();
        return users;
    }

    async deleteUser(email: string): Promise<any> {
        const user = await this.UserRepository.deleteUser(email);
        return user;
    }
}

export default UserService;