

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAssignedPatients, } from '../../service/patient.service';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';




const getAssignedPatientsHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const branchId = req.headers['x-branch-id'] as string
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)
    const doctorId = req.userData.userId
    const respose = await getAssignedPatients(doctorId)
    res.status(200).json({
        data: respose,
        success: true,
    });



})

export { getAssignedPatientsHandler };
