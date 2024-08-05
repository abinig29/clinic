import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatienAllergy } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientAllergyInput, createOrUpdatePatientAllergySchema } from '../../../validation/patient.validation';




const createPatientAllergyHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientAllergySchema>["params"], {}, createOrUpdatePatientAllergyInput>, res: Response) => {
    const response = await savePatienAllergy({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient Allergy created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientAllergyHandler };
