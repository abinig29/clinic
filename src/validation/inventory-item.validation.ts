

import { TypeOf, object, z } from "zod";


export const createInventoryItemSchema = z.object({
    body: z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
        underStockThreshold: z.number().optional(),
        overStockThreshold: z.number().optional(),
        inventoryItemCategoryId: z.string(),
        vendorId: z.string().optional()
    }),
    params: object({
        storeId: z.string()
    })
})

export const addInventoryItemSchema = z.object({
    body: z.object({
        userId: z.string(),
        amount: z.number(),
        productId: z.string()
    }),
    params: object({
        storeId: z.string()
    })
})

export const updateInventoryItemSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        underStockThreshold: z.number().optional(),
        overStockThreshold: z.number().optional(),
        inventoryItemCategoryId: z.string().optional(),
        vendorId: z.string().optional()
    }),
    params: object({
        storeId: z.string(),
        id: z.string()
    })
})

export const deleteInventoryItemSchema = z.object({
    params: z.object({
        id: z.string().min(1),
        storeId: z.string(),

    }),
})

export const getInventoryItemByIdSchema = z.object({
    params: object({
        id: z.string().min(1),
        storeId: z.string(),

    })
})



export type createInventoryItemInput = TypeOf<typeof createInventoryItemSchema>["body"]
export type updateInventoryItemInput = TypeOf<typeof updateInventoryItemSchema>["body"]
export type addInventoryItemInput = TypeOf<typeof addInventoryItemSchema>["body"]

