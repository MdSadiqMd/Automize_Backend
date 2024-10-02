import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { serverConfig } from "../config";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as unknown as string;
    try {
        const payload = jwt.verify(token, serverConfig.JWT_PASSWORD);
        // @ts-ignore
        req.id = payload.id;
        next();
    } catch (error: any) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                message: "You are not logged in"
            });
    }
}

export default authMiddleware;