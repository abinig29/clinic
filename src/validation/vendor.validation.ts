import { TypeOf, z } from "zod";

export const createVendorSchema = z.object({
    body: z.object({
        name: z.string(),
        contact: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional()
    })
})

export const deleteVendorSchema = z.object({
    params: z.object({
        id: z.string().min(1)
    }),
})

export const updateVendorSchema = z.object({
    body: z.object({
        name: z.string(),
        contact: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional()
    }),
    params: z.object({
        id: z.string().min(1)
    }),
})


export type createVendorInput = TypeOf<typeof createVendorSchema>["body"];
export type updateVendorInput = TypeOf<typeof updateVendorSchema>["body"];
