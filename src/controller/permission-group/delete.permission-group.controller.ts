import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { deletePermissionGroupSchema } from '../../validation/permission-group.validation';
import { deletePermissionGroup, getPermissionGroupById } from '../../service/permission-group.service';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';


//@desc update role
//@method DELETE  /permission-group/:id
//@access private
export const deletePermissionGroupHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deletePermissionGroupSchema>["params"], {}, {}>, res: Response) => {
    const existingPermissionGroup = await getPermissionGroupById(req.params.id)
    if (!existingPermissionGroup) throw new NotFoundError("Permission group not found", ErrorCode.PERMISSION_GROUP_NOT_FOUND)
    const deletedPermissionGroup = await deletePermissionGroup(req.params.id)
    if (deletedPermissionGroup)
        res.status(200).json({ success: true, message: "Permission Group deleted sucessfully" });
})