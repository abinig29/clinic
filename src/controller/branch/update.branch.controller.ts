import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../errors/custom.errors";
import { updateBranchInput, updateBranchSchema } from "../../validation/branch.validation";
import { getBranchById, updateBranch } from "../../service/branch.service";




//@desc update clinic
//@method PATCH   /branch/:id
//@access private
export const updateBranchHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateBranchSchema>["params"], {}, updateBranchInput>, res: Response) => {
    const branchId = req.params.id
    const branch = await getBranchById(branchId)
    if (!branch) throw new NotFoundError('Branch was not found', ErrorCode.BRANCH_NOT_FOUND)
    const updatedClinic = await updateBranch(branchId, { ...req.body })
    res.status(200).json({
        message: 'Branch Updated sucessfully',
        sucess: true,
        body: updatedClinic
    })
})