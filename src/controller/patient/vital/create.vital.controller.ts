import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatienVital } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientVitalInput, createOrUpdatePatientVitalSchema } from '../../../validation/patient.validation';




const createPatientVitalHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientVitalSchema>["params"], {}, createOrUpdatePatientVitalInput>, res: Response) => {
    const response = await savePatienVital({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient vital created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientVitalHandler };
