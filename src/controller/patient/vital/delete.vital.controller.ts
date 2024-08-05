import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { z } from 'zod';
import { deletePatientEntitySchema, } from '../../../validation/patient.validation';
import { deletePatientEntity } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';


//@desc update role
//@method DELETE  /patient/:id/vital/:id
//@access private
export const deletePatientVitalHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deletePatientEntitySchema>["params"], {}, {}>, res: Response) => {
    await deletePatientEntity("PatientVital", { patientId: req.params.patientId, entityId: req.params.id })
    res.status(200).json({ success: true, message: "Patient vital deleted sucessfully" });
})