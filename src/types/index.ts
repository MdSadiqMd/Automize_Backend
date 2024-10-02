import { z } from "zod";

const SignupSchema = z.object({
    email: z.string().min(5),
    password: z.string().min(1),
    name: z.string().min(3)
});

const SigninSchema = z.object({
    email: z.string(),
    password: z.string()
});

const TaskCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
    }))
});

export {
    SigninSchema,
    SignupSchema,
    TaskCreateSchema
};