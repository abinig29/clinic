import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { IUserMessage } from '../../../../middleware/auth';
import { savePatienPlan } from '../../../../service/plan.service';
import { createOrUpdatePatientPlanInput, createOrUpdatePatientPlanSchema } from '../../../../validation/plan.validation';
import { getDiagnosisById } from '../../../../service/diagnosis.service';
import NotFoundError from '../../../../errors/notFound.errors';
import { ErrorCode } from '../../../../errors/custom.errors';



// /diagnosis/:id/plan
const createPatientPlanHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientPlanSchema>["params"], {}, createOrUpdatePatientPlanInput>, res: Response) => {
    const diagnosisId = req.params.diagnosisId
    const diagnosis = await getDiagnosisById(diagnosisId)
    if (!diagnosis) throw new NotFoundError("Diagnosis not found", ErrorCode.DIAGNOSIS_NOT_FOUND)

    const response = await savePatienPlan({ ...req.body }, req.userData?.userId, req.params.diagnosisId, diagnosis?.patientId)
    res.status(201).json({
        message: 'Patient Plan created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientPlanHandler };
