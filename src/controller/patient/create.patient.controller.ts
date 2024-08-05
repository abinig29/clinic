import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';
import { savePatient } from '../../service/patient.service';

import { createPatientInput, } from '../../validation/patient.validation';



//@desc create  patient
//@method POST  /patient
//@access private
const createPatientHandler = asyncHandler(async (req: IUserMessage<{}, {}, createPatientInput>, res: Response) => {

    const branchId = req.headers['x-branch-id'] as string
    const response = await savePatient({ branchId, patient: { ...req.body }, createdBy: req.userData?.userId })
    res.status(201).json({
        message: 'Patient created sucessfully',
        data: response,
        success: true
    });
})
export { createPatientHandler };
