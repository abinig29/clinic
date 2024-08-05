import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { getPatientDiagnosisByIdSchema } from '../../../validation/patient.validation';
import { IUserMessage } from '../../../middleware/auth';
import { getPatientDiagnosisById } from '../../../service/diagnosis.service';



const getPatientDiagnosisHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof getPatientDiagnosisByIdSchema>["params"]>, res: Response) => {
    const plan = await getPatientDiagnosisById(req.params.diagnosisId, req.params.patientId)
    res.status(200).json({
        success: true,
        data: plan,
    })
})

export { getPatientDiagnosisHandler };

