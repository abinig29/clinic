import { TypeOf, z } from "zod";



export const createWorkspaceSchema = z.object({
    body: z.object({
        name: z.string(),
        users: z.array(z.string()).min(1)
    })
})


export const updateWorkspaceSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})

export const kickoutUerfromWorkspaceSchema = z.object({
    body: z.object({
        userId: z.string().optional(),
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})


export const deleteWorkspaceSchema = z.object({
    params: z.object({
        id: z.string().min(1)
    }),
})

export type createWorkspaceInput = TypeOf<typeof createWorkspaceSchema>["body"];
export type updateWorkspaceInput = TypeOf<typeof updateWorkspaceSchema>["body"];
export type kickoutUerfromWorkspaceInput = TypeOf<typeof kickoutUerfromWorkspaceSchema>["body"];



