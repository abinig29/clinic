import { TypeOf, z, object, string } from "zod";


export const createPatientSchema = z.object({
    body: object({
        fullName: z.string().min(1, { message: "Full name should have value" }),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }),
        medicalRecordNumber: z.number().min(1, { message: "Medical Number should have value" }).optional(),
        age: z.number(),
        gender: z.enum(["MALE", "FEMALE"]),
        address: z.object({}),
        insuranceCompanyName: z.string(),
        insuranceNumber: z.string(),
        emergencyContactName: z.string(),
        fixedPrice: z.number().optional(),
        emergencyContactPhone: z.string(),
        emergencyContactAddress: z.object({}).optional()
    }),

})


export const updatePatientSchema = z.object({
    body: object({
        fullName: z.string().min(1, { message: "Full name should have value" }).optional(),
        phoneNumber: z.string().min(1, { message: "Phonenumber should have value" }).optional(),
        medicalRecordNumber: z.number().min(1, { message: "Medical Number should have value" }).optional(),
        age: z.number().optional(),
        gender: z.enum(["MALE", "FEMALE"]).optional(),
        address: z.string().optional(),
        insuranceCompanyName: z.string().optional(),
        insuranceNumber: z.string().optional(),
        fixedPrice: z.number().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactPhone: z.string().optional(),
        emergencyContactAddress: z.string().optional()
    }),
    params: object({
        id: z.string().min(1)
    }),
})

export const updatePatientTeethSchema = z.object({
    body: object({
        pulledOutTeeth: z.array(z.number()),

    }),
    params: object({
        id: z.string().min(1)
    }),
})

export const updatePatientPinSchema = z.object({
    body: object({
        pinned: z.boolean()

    }),
    params: object({
        id: z.string().min(1)
    }),
})


export const assignDocSchema = z.object({
    body: object({
        doctorId: z.string()
    }),
    params: object({
        id: z.string().min(1)
    }),
})


export const deletePatientSchema = z.object({
    params: object({
        id: z.string().min(1)
    })
})

export const getPatientByIdSchema = z.object({
    params: object({
        id: z.string().min(1)
    })
})

export const getPatientDiagnosisByIdSchema = z.object({
    params: object({
        patientId: z.string().min(1),
        diagnosisId: z.string().min(1)
    })
})



export const createOrUpdatePatientHistorySchema = z.object({
    body: object({
        chiefCompliant: z.string(),
        historyPresentIllness: z.string().optional(),
        pastMedicalHistory: z.string().optional(),
        pastDenatlHistory: z.string(),
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})
export const createOrUpdatePatientVitalSchema = z.object({
    body: object({
        bp: z.object({}).optional(),
        weight: z.number().optional(),
        temp: z.string().optional(),
        hr: z.number().optional(),
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})
export const createOrUpdatePatientexaminationSchema = z.object({
    body: object({
        intraOralIntro: z.string().optional(),
        intraOralSummary: z.string().optional(),
        intraOralTeeth: z.array(z.number().optional()).optional(),
        intraOralImages: z.array(z.string().optional()).optional(),
        extraOralIntro: z.string().optional(),
        extraOralSummary: z.string().optional(),
        extraOralImages: z.array(z.string().optional()).optional(),
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})


export const createOrUpdatePatientAllergySchema = z.object({
    body: object({
        name: z.string().optional(),
        level: z.string().optional(),
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})
export const createOrUpdatePatientPaymentSchema = z.object({
    body: object({
        amount: z.number().optional(),
        paymentType: z.enum(["ONLINE", "CASH"]).optional(),
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})

export const deletePatientEntitySchema = z.object({
    params: object({
        id: z.string().min(1),
        patientId: z.string()
    })
})



export const createOrUpdatePatientDiagnosisSchema = z.object({
    body: object({
        name: z.string().optional(),
        summary: z.string().optional(),
        status: z.string()
    }),
    params: object({
        patientId: z.string().min(1),
        id: z.string().optional()
    }),
})


export const getPatientsSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional(),
    })
});




export type createPatientInput = TypeOf<typeof createPatientSchema>["body"]
export type createOrUpdatePatientHistoryInput = TypeOf<typeof createOrUpdatePatientHistorySchema>["body"]
export type createOrUpdatePatientVitalInput = TypeOf<typeof createOrUpdatePatientVitalSchema>["body"]
export type createOrUpdatePatientexaminationInput = TypeOf<typeof createOrUpdatePatientexaminationSchema>["body"]
export type createOrUpdatePatientAllergyInput = TypeOf<typeof createOrUpdatePatientAllergySchema>["body"]
export type createOrUpdatePatientPaymentInput = TypeOf<typeof createOrUpdatePatientPaymentSchema>["body"]
export type createOrUpdatePatientDiagnosisInput = TypeOf<typeof createOrUpdatePatientDiagnosisSchema>["body"]
export type updatePatientTeethInput = TypeOf<typeof updatePatientTeethSchema>["body"]
export type updatePatientPinInput = TypeOf<typeof updatePatientPinSchema>["body"]

export type getPatientsInput = TypeOf<typeof getPatientsSchema>["query"]



export type updatePatientInput = TypeOf<typeof updatePatientSchema>["body"]
export type assignDocInput = TypeOf<typeof assignDocSchema>["body"]




