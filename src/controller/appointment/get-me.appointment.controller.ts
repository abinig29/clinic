import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';
import { getAppointments } from '../../service/appointment.service';
import { createAppointmentInput } from '../../validation/appointment.validation';




const getMeAppointmentHandler = asyncHandler(async (req: IUserMessage<{}, {}, createAppointmentInput>, res: Response) => {
    const branchId = req.headers['x-branch-id'] as string
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)
    const appointments = await getAppointments({ ...req.query, doctorId: req.userData?.userId }, branchId)
    res.status(201).json({
        data: appointments,
        success: true
    });
})
export { getMeAppointmentHandler };
