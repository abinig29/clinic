import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';

import { getWorkspaceById } from '../../service/workspace';
import { getUserById } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { createTaskInput } from '../../validation/task.validation';
import NotFoundError from '../../errors/notFound.errors';
import { saveTask } from '../../service/task.service';




const createTaskHandler = asyncHandler(async (req: IUserMessage<{}, {}, createTaskInput>, res: Response) => {
    if (req.body.assignedTo) {
        const checkUser = await getUserById(req.body?.assignedTo)
        if (!checkUser)
            throw new NotFoundError("User Not Found", ErrorCode?.USER_NOT_FOUND)
    }
    const workspace = await getWorkspaceById(req.body.workSpaceId)
    if (!workspace)
        throw new NotFoundError("Workspace Not Found", ErrorCode?.WORKSPACE_NOT_FOUND)

    const response = await saveTask(req.userData?.userId, req.body)
    res.status(201).json({
        message: 'Task created sucessfully',
        data: response,
        success: true
    });
})
export { createTaskHandler };
