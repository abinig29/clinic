import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatienExamination } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientexaminationInput, createOrUpdatePatientexaminationSchema } from '../../../validation/patient.validation';




const createPatientExaminationHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientexaminationSchema>["params"], {}, createOrUpdatePatientexaminationInput>, res: Response) => {
    const response = await savePatienExamination({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient Examination created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientExaminationHandler };
