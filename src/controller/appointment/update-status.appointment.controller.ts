import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updateAppointmentStatusInput, updateAppointmentStatusSchema } from "../../validation/appointment.validation";
import { getAppointmentById, updateAppointmentStatus } from "../../service/appointment.service";




//@desc update clinic
//@method PATCH   /Appointment/:id/update
//@access private
export const updateAppointmentStatusHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateAppointmentStatusSchema>["params"], {}, updateAppointmentStatusInput>, res: Response) => {
    const appointment = await getAppointmentById(req.params.id)
    if (!appointment) throw new NotFoundError('Appointment was not found', ErrorCode.BRANCH_NOT_FOUND)
    const updatedAppointment = await updateAppointmentStatus(req.params.id, { ...req.body })
    res.status(200).json({
        message: 'Appointment Status Updated sucessfully',
        sucess: true,
        body: updatedAppointment
    })
})