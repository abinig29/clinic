import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../errors/notFound.errors';
import { createUser, getUserById, updateUserPermission } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { updateUserProfileInput, updateUserProfileSchema } from '../../validation/user.validation';
import { hashPassowrd } from '../../utils/bycrpt';
import { IUserMessage } from '../../middleware/auth';
import { getPermissionGroupById } from '../../service/permission-group.service';
import { sendMail } from '../../utils/send-mail';
import { z } from 'zod';
import { updateProfile } from '../../service/profile.service';



//@desc change permission
//@method POST  /users/:id/change-profile
//@access private
const chageProfileHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof updateUserProfileSchema>["params"], {}, updateUserProfileInput>, res: Response) => {


    const userId = req.params.id
    const userexis = await getUserById(userId)
    if (!userexis) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)

    const updatedUser = await updateProfile(userId, { ...req.body })
    res.status(201).json({
        message: 'User profile updated sucessfully',
        data: updatedUser.profile,
        success: true
    });
})
export { chageProfileHandler };
