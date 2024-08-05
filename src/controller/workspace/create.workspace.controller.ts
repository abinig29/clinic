import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';

import { saveWorkspace } from '../../service/workspace';
import { createWorkspaceInput } from '../../validation/workspace.validation';
import { getUserById, getUsersById } from '../../service/user.service';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';




const createWorkspaceHandler = asyncHandler(async (req: IUserMessage<{}, {}, createWorkspaceInput>, res: Response) => {

    const checkUsers = await getUsersById(req.body?.users)
    if (checkUsers?.length != req.body?.users?.length)
        throw new BadRequestError("Please assign existing users", ErrorCode?.USER_NOT_FOUND)
    const response = await saveWorkspace(req.body.name, req.body.users)
    res.status(201).json({
        message: 'Workspace created sucessfully',
        data: response,
        success: true
    });
})
export { createWorkspaceHandler };
