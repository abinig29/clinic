import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/auth';
import { getWorkspaces } from '../../service/workspace';




const getWorkspaceHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const workspaces = await getWorkspaces(req.userData?.userId)
    res.status(200).json({
        success: true,
        data: workspaces,
    })
})

export { getWorkspaceHandler };
