import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../errors/notFound.errors';
import { getUserById, getUserByIdNoSoftDelete, updateActiveStatus } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { changeActiveInput, changeActiveSchema, } from '../../validation/user.validation';
import { IUserMessage } from '../../middleware/auth';
import { z } from 'zod';



//@desc change permission
//@method POST  /users/:id/change-active
//@access private
const changeActiveStatusHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof changeActiveSchema>["params"], {}, changeActiveInput>, res: Response) => {

    const userId = req.params.id
    const userexis = await getUserByIdNoSoftDelete(userId)
    if (!userexis) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)



    const updatedUser = await updateActiveStatus(userId, req.body.softDeleted)

    res.status(201).json({
        message: 'User Active status updated sucessfully',
        data: updatedUser,
        success: true
    });
})
export { changeActiveStatusHandler };
