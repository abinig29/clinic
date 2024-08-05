


import { TypeOf, z } from "zod";


export const createStoreSchema = z.object({
    body: z.object({
        name: z.string(),
        location: z.string()
    })
})
export const deleteStroreSchema = z.object({
    params: z.object({
        id: z.string().min(1)
    }),
})

export const updateStoreSchema = z.object({
    body: z.object({
        name: z.string().optional(),
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})


export type createStoreInput = TypeOf<typeof createStoreSchema>["body"];
export type updateStoreInput = TypeOf<typeof updateStoreSchema>["body"];
