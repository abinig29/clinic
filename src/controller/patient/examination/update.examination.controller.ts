import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { createOrUpdatePatientexaminationInput, createOrUpdatePatientexaminationSchema } from "../../../validation/patient.validation";
import { updatePatientEntity } from "../../../service/patientEntity.service";
import NotFoundError from "../../../errors/notFound.errors";
import { ErrorCode } from "../../../errors/custom.errors";
import { PatientExamination, } from "@prisma/client";
import { getPatientbyId } from "../../../service/patient.service";





//@desc update patinet
//@method PATCH   /patinet/:id/vital/id
//@access private
export const updatePatientExaminationHandler = asyncHandler(async (req: Request<z.TypeOf<typeof createOrUpdatePatientexaminationSchema>["params"], {}, createOrUpdatePatientexaminationInput>, res: Response) => {
    const patientId = req.params.patientId
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatientEntity<PatientExamination>(
        'PatientExamination',
        {
            patientId: patientId,
            entityId: req.params.id,
            updatedFields: { ...req.body }
        })
    res.status(200).json({
        message: 'Patient Examination updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})
