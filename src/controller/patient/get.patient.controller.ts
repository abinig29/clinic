import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getPaginatedPatients } from '../../service/patient.service';
import { prisma } from '../../config/prisma';
import { getPatientsInput } from '../../validation/patient.validation';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';



//@desc get all patients
//@method GET  /patient
//@access private
const getPatientsHandler = asyncHandler(async (req: Request, res: Response) => {
    const branchId = req.headers['x-branch-id'] as string
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)
    const respose = await getPaginatedPatients(req.query, branchId)

    res.status(200).json({
        currentPage: respose.currentPage,
        totalItems: respose.totalCount,
        totalPages: respose.totalPages,
        data: respose.patients,
        success: true,
    });



})

export { getPatientsHandler };
