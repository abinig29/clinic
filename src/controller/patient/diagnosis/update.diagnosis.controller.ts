import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updatePatientDiagnosis, } from "../../../service/diagnosis.service";
import NotFoundError from "../../../errors/notFound.errors";
import { ErrorCode } from "../../../errors/custom.errors";
import { IUserMessage } from "../../../middleware/auth";
import { createOrUpdatePatientDiagnosisInput, createOrUpdatePatientDiagnosisSchema } from "../../../validation/patient.validation";
import { getPatientbyId } from "../../../service/patient.service";





//@desc update patinet allergy
//@method PATCH   /patinet/:id/allergy/id
//@access private
export const updatePatientDiagnosisHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createOrUpdatePatientDiagnosisSchema>["params"], {}, createOrUpdatePatientDiagnosisInput>, res: Response) => {
    const patientId = req.params.patientId
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatientDiagnosis(
        {
            patientId: patientId,
            entityId: req.params.id,
            updatedFields: { ...req.body },
            doctorId: req.userData.userId
        })
    res.status(200).json({
        message: 'Patient Diagnosis updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})
