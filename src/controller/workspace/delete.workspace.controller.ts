import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';
import { deleteWorkspace, getWorkspaceById } from '../../service/workspace';
import { deleteWorkspaceSchema } from '../../validation/workspace.validation';



export const deleteWorkspaceHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteWorkspaceSchema>["params"], {}, {}>, res: Response) => {
    const existingWorkspace = await getWorkspaceById(req.params.id)
    if (!existingWorkspace) throw new NotFoundError("Workspace not found", ErrorCode.WORKSPACE_NOT_FOUND)
    await deleteWorkspace(req.params.id)
    res.status(204).json({ success: true, message: "Workspace deleted sucessfully" });
})