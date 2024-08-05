import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updateClinicInput, updateClinicSchema } from "../../validation/clinic.validation";
import { getClinic, updateClinic } from "../../service/clinic.service";




//@desc update clinic
//@method PATCH   /clinic/:id
//@access private
export const updateClinicHandler = asyncHandler(async (req: Request<{}, {}, updateClinicInput>, res: Response) => {
    const clinic = await getClinic()
    if (!clinic) throw new NotFoundError('Clinic was not found', ErrorCode.CLINIC_NOT_FOUND)
    const updatedClinic = await updateClinic(clinic.id, { ...req.body })
    res.status(200).json({
        message: 'Clinic Updated sucessfully',
        sucess: true,
        body: updatedClinic
    })
})