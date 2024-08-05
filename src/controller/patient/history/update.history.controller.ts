import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { createOrUpdatePatientHistoryInput, createOrUpdatePatientHistorySchema } from "../../../validation/patient.validation";
import { updatePatientEntity } from "../../../service/patientEntity.service";
import NotFoundError from "../../../errors/notFound.errors";
import { ErrorCode } from "../../../errors/custom.errors";
import { PatientHistory } from "@prisma/client";
import { getPatientbyId } from "../../../service/patient.service";





//@desc update patinet
//@method PATCH   /patinet/:id/history/id
//@access private
export const updatePatientHistoryHandler = asyncHandler(async (req: Request<z.TypeOf<typeof createOrUpdatePatientHistorySchema>["params"], {}, createOrUpdatePatientHistoryInput>, res: Response) => {
    const patientId = req.params.patientId
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatientEntity<PatientHistory>(
        'PatientHistory',
        {
            patientId: patientId,
            entityId: req.params.id,
            updatedFields: { ...req.body }
        })
    res.status(200).json({
        message: 'Patient History updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})
