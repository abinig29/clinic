import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllPermissionGroups } from '../../service/permission-group.service';



//@desc get all permission groups
//@method GET  /permission-group
//@access private
const getPermissionGroupsHandler = asyncHandler(async (req: Request, res: Response) => {
    const permissionGroups = await getAllPermissionGroups()
    res.status(200).json({
        success: true,
        data: permissionGroups,
    })
})

export { getPermissionGroupsHandler };
