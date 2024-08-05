import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';
import { deletePatient, getPatientbyId } from '../../service/patient.service';
import { deletePatientSchema } from '../../validation/patient.validation';


//@desc update role
//@method DELETE  /patient/:id
//@access private
export const deletePatientHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deletePatientSchema>["params"], {}, {}>, res: Response) => {
    const existingPatient = await getPatientbyId(req.params.id)
    if (!existingPatient) throw new NotFoundError("Patient group not found", ErrorCode.PATIENT_NOT_FOUND)
    const deletedPatient = await deletePatient(req.params.id)
    res.status(200).json({ success: true, message: "Patient deleted sucessfully" });
})