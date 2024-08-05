import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllUsers } from '../../service/user.service';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';




//@desc get all users
//@method GET  /users
//@access private
const getAllUsersHandler = asyncHandler(async (req: Request, res: Response) => {
    const branchId = req.headers['x-branch-id'] as string
    if (!branchId) throw new BadRequestError("Havent found any branch", ErrorCode.NO_PERMISSION)
    const items = await getAllUsers(branchId, req.query)
    res.json({
        success: true,
        data: items,
    })
})
export {
    getAllUsersHandler

};
