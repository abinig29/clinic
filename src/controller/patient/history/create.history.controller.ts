import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { z } from 'zod';
import { savePatientHistory } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';
import { createOrUpdatePatientHistoryInput, createOrUpdatePatientHistorySchema } from '../../../validation/patient.validation';



//@desc create  patient
//@method POST  /patient/:id/history
//@access private
const createPatientHistoryHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientHistorySchema>["params"], {}, createOrUpdatePatientHistoryInput>, res: Response) => {
    const response = await savePatientHistory({ ...req.body }, req.userData?.userId, req.params.patientId)
    res.status(201).json({
        message: 'Patient History created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientHistoryHandler };
