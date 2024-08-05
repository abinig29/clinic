import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';
import { deleteBranch, getBranchById } from '../../service/branch.service';
import { deleteBranchSchema } from '../../validation/branch.validation';


//@desc delete branch
//@method DELETE  /branch
//@access private
export const deleteBranchHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteBranchSchema>["params"], {}, {}>, res: Response) => {
    const branch = await getBranchById(req.params.id)
    if (!branch) throw new NotFoundError('Branch was not found', ErrorCode.BRANCH_NOT_FOUND)
    await deleteBranch(req.params.id)
    res.status(200).json({ success: true, message: "Branch deleted sucessfully" });
})