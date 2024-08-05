import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";


import { IUserMessage } from "../../../../middleware/auth";
import { createOrUpdatePatientPlanInput, createOrUpdatePatientPlanSchema } from "../../../../validation/plan.validation";
import { updatePatientPlan } from "../../../../service/plan.service";





//@desc update patinet allergy
//@method PATCH   /patinet/:id/allergy/id
//@access private
export const updatePatientPlanHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientPlanSchema>["params"], {}, createOrUpdatePatientPlanInput>, res: Response) => {
    const diagnosisId = req.params.diagnosisId
    const updatedDiagnosis = await updatePatientPlan(
        {
            diagnosisId,
            entityId: req.params.id,
            updatedFields: { ...req.body },
            doctorId: req.userData.userId
        })
    res.status(200).json({
        message: 'Patient Plan updated sucessfully',
        sucess: true,
        body: updatedDiagnosis?.PatientPlan
    })
})
