import { prismaClient } from "../db";

class ActionService {
    async getAvailableActions() {
        const availableActions = await prismaClient.availableAction.findMany({});
        return availableActions;
    }
}

export default ActionService;