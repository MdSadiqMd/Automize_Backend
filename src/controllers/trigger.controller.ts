import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { TriggerService } from "../services";
import { logger } from "../config";

const triggerService = new TriggerService();

async function availableTriggers(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const triggers = await triggerService.getAvailableTriggers();
        logger.info(`All Triggers Fetched`);
        return res
            .status(StatusCodes.OK)
            .json({
                success: "true",
                message: "All Triggers Fetched",
                error: {},
                data: triggers
            });
    } catch (error: any) {
        logger.error(`Error in fetching Triggers: ${error}`);
        next(error);
    }
}

export default {
    availableTriggers
};