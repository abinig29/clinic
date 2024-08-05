import { object, string, TypeOf, z } from "zod";

export const createAppointmentSchema = z.object({
    body: object({
        patientId: z.string(),
        doctorId: z.string(),
        date: z.string(),
        time: z.string(),
        duration: z.number(),
        note: z.string().optional()
    })
})


export const updateAppointmentSchema = z.object({
    body: object({
        date: z.string(),
        duration: z.number(),
        patientId: z.string(),
        note: z.string().optional(),
        time: z.string(),
        doctorId: z.string(),
    }),
    params: object({
        id: z.string().min(1)
    })

})


export const updateAppointmentStatusSchema = z.object({
    body: object({
        status: z.enum(["SCHEDULED", "CANCELLED", "RESCHEDULED", "COMPLETED", "STARTED"]),
    }),
    params: object({
        id: z.string().min(1)
    })

})




export const getAppointmentSchema = z.object({
    query: z.object({
        date: z.string().optional(),
        doctorId: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional()
    })
})


export type createAppointmentInput = TypeOf<typeof createAppointmentSchema>["body"];
export type updateAppointmentStatusInput = TypeOf<typeof updateAppointmentStatusSchema>["body"];
export type getAppointmentsInput = TypeOf<typeof getAppointmentSchema>["query"];

export type updateAppointmentInput = TypeOf<typeof updateAppointmentSchema>["body"];

