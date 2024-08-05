import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { assignDocInput, assignDocSchema, } from "../../validation/patient.validation";
import { assignDoc, getPatientbyId } from "../../service/patient.service";
import { getUserById } from "../../service/user.service";




//@desc update patinet
//@method PATCH   /patinet/:id
//@access private
export const assignDocForPatientHandler = asyncHandler(async (req: Request<z.TypeOf<typeof assignDocSchema>["params"], {}, assignDocInput>, res: Response) => {
    const patientId = req.params.id
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const doctorId = req.body.doctorId
    const doctor = await getUserById(doctorId)
    if (!doctor) throw new NotFoundError('Doctor not found', ErrorCode.USER_NOT_FOUND)

    const updatedPatient = await assignDoc(patientId, doctorId)
    res.status(200).json({
        message: 'Doctor Assigned sucessfully',
        sucess: true,
        body: updatedPatient
    })
})