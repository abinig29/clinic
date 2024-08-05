import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatienPayment } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientPaymentInput, createOrUpdatePatientPaymentSchema } from '../../../validation/patient.validation';




const createPatientPaymentHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientPaymentSchema>["params"], {}, createOrUpdatePatientPaymentInput>, res: Response) => {
    const response = await savePatienPayment({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient Payment created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientPaymentHandler };
