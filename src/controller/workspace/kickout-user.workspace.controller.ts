import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { kickoutUerfromWorkspaceInput, kickoutUerfromWorkspaceSchema, } from "../../validation/workspace.validation";
import { kickOutUserToWorkspace } from "../../service/workspace";
import { getUserById } from "../../service/user.service";





export const kickOutUserToWorkspaceFromWorkspaceHandler = asyncHandler(async (req: Request<z.TypeOf<typeof kickoutUerfromWorkspaceSchema>["params"], {}, kickoutUerfromWorkspaceInput>, res: Response) => {
    const userId = req.body.userId
    const user = await getUserById(userId)
    if (!user) throw new NotFoundError('User not found', ErrorCode.USER_NOT_FOUND)

    const updatedWorkSpace = await kickOutUserToWorkspace(req.params.id, userId)
    res.status(200).json({
        message: 'User Removed From Workspace',
        sucess: true,
        body: updatedWorkSpace
    })
})