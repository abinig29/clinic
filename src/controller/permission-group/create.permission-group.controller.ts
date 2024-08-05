import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createPermissionGroupInputType } from '../../validation/permission-group.validation';
import { IUserMessage } from '../../middleware/auth';
import { savePermissionGroup } from '../../service/permission-group.service';



//@desc create  permission group
//@method POST  /permission-group
//@access private
const createPermissionGroupHandler = asyncHandler(async (req: IUserMessage<{}, {}, createPermissionGroupInputType>, res: Response) => {
    const { name, permissions } = req.body
    const response = await savePermissionGroup(name, permissions)
    res.status(201).json({
        message: 'Role created sucessfully',
        data: response,
        success: true
    });
})
export { createPermissionGroupHandler };
