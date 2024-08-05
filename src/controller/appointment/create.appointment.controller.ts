import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';
import { checkAppointmentPre, createAppointment } from '../../service/appointment.service';
import { createAppointmentInput } from '../../validation/appointment.validation';



//@desc create  clinic
//@method POST  /clinic
//@access private

const createAppointmentHandler = asyncHandler(async (req: IUserMessage<{}, {}, createAppointmentInput>, res: Response) => {
    const { doctorId, patientId } = req.body
    const branchId = req.headers['x-branch-id'] as string
    const isElligible = await checkAppointmentPre({ doctorId, patientId, branchId })
    if (!isElligible) throw new BadRequestError("Unable to create new appointment", ErrorCode.NO_PERMISSION)
    const appointment = await createAppointment({ ...req.body, date: new Date(req.body.date), branchId })
    res.status(201).json({
        message: 'Appointment created sucessfully',
        data: appointment,
        success: true
    });
})
export { createAppointmentHandler };
