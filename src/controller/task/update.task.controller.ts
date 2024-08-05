import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';

import { getWorkspaceById } from '../../service/workspace';
import { getUserById } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { createTaskInput, updateTaskInput, updateTaskSchema } from '../../validation/task.validation';
import NotFoundError from '../../errors/notFound.errors';
import { saveTask, updateTask } from '../../service/task.service';
import { z } from 'zod';




const updateTaskHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateTaskSchema>["params"], {}, updateTaskInput>, res: Response) => {
    if (req.body.assignedTo) {
        const checkUser = await getUserById(req.body?.assignedTo)
        if (!checkUser)
            throw new NotFoundError("User Not Found", ErrorCode?.USER_NOT_FOUND)
    }

    const response = await updateTask(req.body, req.params.id)
    res.status(201).json({
        message: 'Task updated sucessfully',
        data: response,
        success: true
    });
})
export { updateTaskHandler };
