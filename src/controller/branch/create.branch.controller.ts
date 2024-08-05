import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';
import { createClinicInput } from '../../validation/clinic.validation';
import { ErrorCode } from '../../errors/custom.errors';
import NotFoundError from '../../errors/notFound.errors';
import { createBranch } from '../../service/branch.service';
import { getClinic } from '../../service/clinic.service';



//@desc create  branch
//@method POST  /branch
//@access private

const createBranchHandler = asyncHandler(async (req: IUserMessage<{}, {}, createClinicInput>, res: Response) => {
    const clinic = await getClinic()
    if (!clinic) throw new NotFoundError('Clinic was not found', ErrorCode.CLINIC_NOT_FOUND)
    const response = await createBranch({ ...req.body }, clinic.id)

    res.status(201).json({
        message: 'Branch created sucessfully',
        data: response,
        success: true
    });
})
export { createBranchHandler };
