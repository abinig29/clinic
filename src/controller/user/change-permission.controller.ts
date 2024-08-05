import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../errors/notFound.errors';
import { createUser, getUserById, updateUserPermission } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { changePermissionInput, changePermissionSchema, createUserInput } from '../../validation/user.validation';
import { hashPassowrd } from '../../utils/bycrpt';
import { IUserMessage } from '../../middleware/auth';
import { getPermissionGroupById } from '../../service/permission-group.service';
import { sendMail } from '../../utils/send-mail';
import { z } from 'zod';



//@desc change permission
//@method POST  /users/:id/change-permission
//@access private
const changePermissionHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof changePermissionSchema>["params"], {}, changePermissionInput>, res: Response) => {

    const { roleId, branchId } = req.body
    const userId = req.params.id
    const userexis = await getUserById(userId, true)
    if (!userexis) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)
    const role = await getPermissionGroupById(roleId)
    // TO DO check branch

    const updatedUser = await updateUserPermission({
        id: userId,
        role: role?.name ?? userexis?.role,
        branchId: branchId?.length ? branchId : userexis?.permission?.branchId,
        permissions: role?.permissions?.length ? role?.permissions : userexis?.permission?.permissions
    })

    res.status(201).json({
        message: 'User permission updated sucessfully',
        data: updatedUser,
        success: true
    });
})
export { changePermissionHandler };
