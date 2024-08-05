import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';
import { IUserMessage } from '../../../../middleware/auth';
import { getPatientPlanByIdSchema } from '../../../../validation/plan.validation';
import { getPatientPlanById } from '../../../../service/plan.service';



const getPatientPlanHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof getPatientPlanByIdSchema>["params"]>, res: Response) => {
    const diagnosis = await getPatientPlanById(req.params.diagnosisId, req.params.id)
    res.status(200).json({
        success: true,
        data: diagnosis,
    })
})

export { getPatientPlanHandler };

