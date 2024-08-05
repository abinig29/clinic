import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { z } from 'zod';
import { IUserMessage } from '../../../../middleware/auth';
import { deletePatientPlanSchema } from '../../../../validation/plan.validation';
import { deletePatientPlan } from '../../../../service/plan.service';


//@desc update role
//@method DELETE  /diagnosis/:id/plan/:id
//@access private
export const deletePatientPlanHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deletePatientPlanSchema>["params"], {}, {}>, res: Response) => {
    await deletePatientPlan(req.params.diagnosisId, req.params.id)
    res.status(200).json({ success: true, message: "Patient Plan deleted sucessfully" });
})