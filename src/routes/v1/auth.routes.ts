import express from "express";

import { userController } from "../../controllers";

const userRouter = express.Router();

userRouter.post("/signup", userController.createUser);
userRouter.post("/signin", userController.loginUser);
userRouter.get('/user', userController.getUser);
userRouter.get('/', userController.getAllUsers);
userRouter.delete('/', userController.deleteUser);

export default userRouter;