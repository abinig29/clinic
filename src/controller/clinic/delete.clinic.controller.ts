import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { deletePermissionGroupSchema } from '../../validation/permission-group.validation';
import { deletePermissionGroup, getPermissionGroupById } from '../../service/permission-group.service';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';
import { deleteClinic, getClinic } from '../../service/clinic.service';


//@desc delete clinic
//@method DELETE  /clinic
//@access private
export const deleteClinicHandler = asyncHandler(async (req: IUserMessage<{}, {}, {}>, res: Response) => {
    const clinic = await getClinic()
    if (!clinic) throw new NotFoundError('Clinic was not found', ErrorCode.CLINIC_NOT_FOUND)
    const deletedClinic = await deleteClinic(clinic.id, req.userData?.userId)
    if (deletedClinic)
        res.status(200).json({ success: true, message: "Clinic deleted sucessfully" });
})