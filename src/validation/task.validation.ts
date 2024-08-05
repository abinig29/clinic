
import { TypeOf, z } from "zod";



export const createTaskSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT", "NO_PRIORITY",]).optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELED"]).optional(),
        assignedTo: z.string(),
        workSpaceId: z.string()
    })
})



export const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        dueDate: z.string().optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT", "NO_PRIORITY",]).optional(),
        status: z.enum(["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELED"]).optional(),
        assignedTo: z.string().optional(),
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})








export type createTaskInput = TypeOf<typeof createTaskSchema>["body"];
export type updateTaskInput = TypeOf<typeof updateTaskSchema>["body"];



