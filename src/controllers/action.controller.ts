import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { ActionService } from "../services";
import { logger } from "../config";

const actionService = new ActionService();

async function availableActions(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const actions = await actionService.getAvailableActions();
        logger.info(`All Actions Fetched`);
        return res
            .status(StatusCodes.OK)
            .json({
                success: "true",
                message: "All Actions Fetched",
                error: {},
                data: actions
            });
    } catch (error: any) {
        logger.error(`Error in fetching Actions: ${error}`);
        next(error);
    }
}

export default {
    availableActions
};