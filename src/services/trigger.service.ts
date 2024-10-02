import { prismaClient } from "../db";

class TriggerService {
    async getAvailableTriggers() {
        const availableTriggers = await prismaClient.availableTrigger.findMany({});
        return availableTriggers;
    }
}

export default TriggerService;