import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";


import { IUserMessage } from "../../../../middleware/auth";
import { createOrUpdatePatientPlanSchema } from "../../../../validation/plan.validation";
import { updatePatientPlan } from "../../../../service/plan.service";




export const refillPatientPlanHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientPlanSchema>["params"], {}, {}>, res: Response) => {
    const diagnosisId = req.params.diagnosisId
    const updatedDiagnosis = await updatePatientPlan(
        {
            diagnosisId,
            entityId: req.params.id,
            updatedFields: { status: "Active" },
            log: "refill this plan",
            doctorId: req.userData.userId
        })
    res.status(200).json({
        message: 'Patient Plan refill sucessfully',
        sucess: true,
        body: updatedDiagnosis?.PatientPlan
    })
})
