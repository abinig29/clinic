import { TypeOf, z, object, string } from "zod";

export const createBranchSchema = z.object({
    body: object({
        name: z.string({ required_error: "Name is required" }),
        email: z.string().email({ message: "Email should have email format" }).optional(),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }),
        address: z.object({}),
        startMedicalNumber: z.number().optional()
    })
})



export const updateBranchSchema = z.object({
    body: object({
        name: z.string({ required_error: "Name is required" }).optional(),
        email: z.string().email({ message: "Email should have email format" }).optional(),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }).optional(),
        address: z.object({}).optional(),
        startMedicalNumber: z.number().optional()
    }),
    params: object({
        id: z.string().min(1)
    })

})
export const deleteBranchSchema = z.object({
    params: object({
        id: z.string().min(1)
    })
})

export type createBranchInput = TypeOf<typeof createBranchSchema>["body"]
export type updateBranchInput = TypeOf<typeof updateBranchSchema>["body"]
