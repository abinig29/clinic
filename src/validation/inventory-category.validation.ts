


import { TypeOf, z } from "zod";


export const createCategorySchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string().optional(),
        img: z.string().optional()
    })
})

export const deleteCategorySchema = z.object({
    params: z.object({
        id: z.string().min(1)
    }),
})

export const updateCategorySchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        img: z.string().optional()
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})


export type createCategoryInput = TypeOf<typeof createCategorySchema>["body"];
export type updateCategoryInput = TypeOf<typeof updateCategorySchema>["body"];
