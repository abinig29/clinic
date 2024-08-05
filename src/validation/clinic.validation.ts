import { TypeOf, z, object, string } from "zod";

export const createClinicSchema = z.object({
    body: object({
        name: z.string({ required_error: "Name is required" }),
        socialMedia: z.object({}),
        email: z.string().email({ message: "Email should have email format" }).optional(),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }),
        services: z.array(z.string()).optional(),
        description: z.string().optional()
    })
})

export const updateClinicSchema = z.object({
    body: object({
        name: z.string({ required_error: "Name is required" }).optional(),
        socialMedia: z.object({}).optional(),
        email: z.string().email({ message: "Email should have email format" }).optional(),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }).optional(),
        services: z.array(z.string()).optional(),
        description: z.string().optional()

    })

})

export type createClinicInput = TypeOf<typeof createClinicSchema>["body"]
export type updateClinicInput = TypeOf<typeof updateClinicSchema>["body"]
