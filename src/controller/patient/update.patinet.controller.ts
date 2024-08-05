import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updatePermissionGroupInputType, updatePermissionGroupSchema } from "../../validation/permission-group.validation";
import { getPermissionGroupById, updatePermissionGroup } from "../../service/permission-group.service";
import { ErrorCode } from "../../errors/custom.errors";
import { updatePatientInput, updatePatientSchema } from "../../validation/patient.validation";
import { getPatientbyId, updatePatient } from "../../service/patient.service";




//@desc update patinet
//@method PATCH   /patinet/:id
//@access private
export const updatePatientHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updatePatientSchema>["params"], {}, updatePatientInput>, res: Response) => {
    const patientId = req.params.id
    const patient = await getPatientbyId(patientId)
    if (!patient) throw new NotFoundError('Patient not found', ErrorCode.PATIENT_NOT_FOUND)
    const updatedPatient = await updatePatient(patientId, { ...req.body })
    res.status(200).json({
        message: 'Patient Updated sucessfully',
        sucess: true,
        body: updatedPatient
    })
})