import { Response } from "express";
import asyncHandler from "express-async-handler";
import { IUserMessage } from "../../middleware/auth";
import { updatenotifyNewLogin } from "../../service/security-profile.profile";
import { updatNotifyNewLoginInput } from "../../validation/security-profile.validation";




//@desc update saveActivityLog of user
//@method PATCH   /security-profile/notifyNewLogin
//@access private
export const updateNotifyNeLoginHandler = asyncHandler(async (req: IUserMessage<{}, {}, updatNotifyNewLoginInput>, res: Response) => {
    const userId = req.userData?.userId
    const user = await updatenotifyNewLogin(userId, req.body.notify)
    res.status(200).json({
        message: 'Setting Updated sucessfully',
        sucess: true,
        body: user?.SecurityProfile
    })
})