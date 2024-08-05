import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updatePermissionGroupInputType, updatePermissionGroupSchema } from "../../validation/permission-group.validation";
import { getPermissionGroupById, updatePermissionGroup } from "../../service/permission-group.service";
import { ErrorCode } from "../../errors/custom.errors";




//@desc update permission group
//@method PATCH   /permission-group/:id
//@access private
export const updatePermissionGroupHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updatePermissionGroupSchema>["params"], {}, updatePermissionGroupInputType>, res: Response) => {
    const permissionGroupId = req.params.id
    const permissionGroup = await getPermissionGroupById(permissionGroupId)
    if (!permissionGroup) throw new NotFoundError('EvenPermission Group not found', ErrorCode.PERMISSION_GROUP_NOT_FOUND)

    const updatedPermissionGroup = await updatePermissionGroup(permissionGroupId, { name: req.body.name, permissions: req.body.permissions })
    res.status(200).json({
        message: 'Role Updated sucessfully',
        sucess: true,
        body: updatedPermissionGroup
    })
})