import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updateAppointmentInput, updateAppointmentSchema, } from "../../validation/appointment.validation";
import { checkAppointmentPre, getAppointmentById, updateAppointment, updateAppointmentStatus } from "../../service/appointment.service";
import { IUserMessage } from "../../middleware/auth";
import BadRequestError from "../../errors/badRequest.errors";




//@desc update clinic
//@method PATCH   /Appointment/:id/update
//@access private
export const updateAppointmentHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateAppointmentSchema>["params"], {}, updateAppointmentInput>, res: Response) => {
    const appointment = await getAppointmentById(req.params.id)
    if (!appointment) throw new NotFoundError('Appointment was not found', ErrorCode.BRANCH_NOT_FOUND)
    const branchId = req.headers['x-branch-id'] as string
    const isElligible = await checkAppointmentPre({ doctorId: req.userData.userId, patientId: req.body.patientId, branchId })
    if (!isElligible) throw new BadRequestError("Unable to update appointment", ErrorCode.NO_PERMISSION)
    const updatedAppointment = await updateAppointment(req.params.id, { ...req.body, date: new Date(req.body.date), branchId })
    res.status(200).json({
        message: 'Appointment Status Updated sucessfully',
        sucess: true,
        body: updatedAppointment
    })
})