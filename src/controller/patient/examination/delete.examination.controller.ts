import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { z } from 'zod';
import { deletePatientEntitySchema, } from '../../../validation/patient.validation';
import { deletePatientEntity } from '../../../service/patientEntity.service';
import { IUserMessage } from '../../../middleware/auth';


//@desc update role
//@method DELETE  /patient/:id/examination/:id
//@access private
export const deletePatientExaminationHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deletePatientEntitySchema>["params"], {}, {}>, res: Response) => {
    await deletePatientEntity("PatientExamination", { patientId: req.params.patientId, entityId: req.params.id })
    res.status(200).json({ success: true, message: "Patient examination deleted sucessfully" });
})