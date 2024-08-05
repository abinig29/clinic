import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { updatePermissionGroup } from "../../service/permission-group.service";
import { ErrorCode } from "../../errors/custom.errors";
import { updateWorkspaceInput, updateWorkspaceSchema } from "../../validation/workspace.validation";
import { getWorkspaceById, updateWorkspace } from "../../service/workspace";





export const updateWorkspaceHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateWorkspaceSchema>["params"], {}, updateWorkspaceInput>, res: Response) => {
    const workSpaceId = req.params.id
    const workSpace = await getWorkspaceById(workSpaceId)
    if (!workSpace) throw new NotFoundError('WorkSpace not found', ErrorCode.WORKSPACE_NOT_FOUND)

    const updatedWorkSpace = await updateWorkspace(workSpaceId, req.body)
    res.status(200).json({
        message: 'Workspace Updated sucessfully',
        sucess: true,
        body: updatedWorkSpace
    })
})