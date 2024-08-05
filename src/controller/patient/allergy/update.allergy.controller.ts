import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { createOrUpdatePatientAllergyInput, createOrUpdatePatientAllergySchema } from "../../../validation/patient.validation";
import { updatePatientEntity } from "../../../service/patientEntity.service";
import NotFoundError from "../../../errors/notFound.errors";
import { ErrorCode } from "../../../errors/custom.errors";
import { PatientAllergy } from "@prisma/client";
import { getPatientbyId } from "../../../service/patient.service";





//@desc update patinet allergy
//@method PATCH   /patinet/:id/allergy/id
//@access private
export const updatePatientAllergyHandler = asyncHandler(async (req: Request<z.TypeOf<typeof createOrUpdatePatientAllergySchema>["params"], {}, createOrUpdatePatientAllergyInput>, res: Response) => {
    const patientId = req.params.patientId
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatientEntity<PatientAllergy>(
        'PatientAllergy',
        {
            patientId: patientId,
            entityId: req.params.id,
            updatedFields: { ...req.body }
        })
    res.status(200).json({
        message: 'Patient Allergy updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})
