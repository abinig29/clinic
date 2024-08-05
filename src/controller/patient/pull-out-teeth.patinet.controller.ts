import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updatePatientTeethInput, updatePatientTeethSchema } from "../../validation/patient.validation";
import { getPatientbyId, updatePatient } from "../../service/patient.service";




//@desc update patinet
//@method PATCH   /patinet/:id
//@access private
export const updatePatientTeethHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updatePatientTeethSchema>["params"], {}, updatePatientTeethInput>, res: Response) => {
    const patientId = req.params.id
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatient(patientId, { ...req.body })
    res.status(200).json({
        message: 'Tooth Updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})