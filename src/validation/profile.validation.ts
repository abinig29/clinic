
import { TypeOf, z, object, string } from "zod";

export const updateProfileSchema = z.object({
    body: object({
        fullName: string({ required_error: "Should have full name" }).optional(),
        addresses: z.array(z.string().optional()).optional(),
        gender: z.enum(['M', "F"]).optional(),
        dateOfBirth: z.date().optional(),
        emernContact: z.string().optional(),
    })
})


export type updateProfileInput = TypeOf<typeof updateProfileSchema>["body"];
