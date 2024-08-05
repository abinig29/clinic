import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatienDiagnosis } from '../../../service/diagnosis.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientDiagnosisInput, createOrUpdatePatientDiagnosisSchema } from '../../../validation/patient.validation';




const createPatientDiagnosisHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientDiagnosisSchema>["params"], {}, createOrUpdatePatientDiagnosisInput>, res: Response) => {
    const response = await savePatienDiagnosis({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient Diagnosis created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientDiagnosisHandler };
