import { TypeOf, z, object, string } from "zod";
export const getPatientPlanByIdSchema = z.object({
    params: object({
        id: z.string().min(1),
        diagnosisId: z.string().min(1)
    })
})


export const deletePatientPlanSchema = z.object({
    params: object({
        id: z.string().min(1),
        diagnosisId: z.string()
    })
})

export const createOrUpdatePatientPlanSchema = z.object({
    body: object({
        name: z.string().optional(),
        summary: z.string().optional(),
        status: z.enum(["Pending", "Active", "Completed", "Hold"]).optional(),
        dosage: z.string().optional(),
        duaration: z.string().optional()
    }),
    params: object({
        diagnosisId: z.string().min(1),
        id: z.string().optional()
    }),
})

export type createOrUpdatePatientPlanInput = TypeOf<typeof createOrUpdatePatientPlanSchema>["body"]



