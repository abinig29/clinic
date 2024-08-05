import { Response } from "express";
import asyncHandler from "express-async-handler";
import { IUserMessage } from "../../middleware/auth";
import { updateSaveLog } from "../../service/security-profile.profile";
import { updatSaveLogInput } from "../../validation/security-profile.validation";




//@desc update saveActivityLog of user
//@method PATCH   /security-profile/saveLog
//@access private
export const updateSaveLogHandler = asyncHandler(async (req: IUserMessage<{}, {}, updatSaveLogInput>, res: Response) => {
    const userId = req.userData?.userId
    const user = await updateSaveLog(userId, req.body.saveLog)
    res.status(200).json({
        message: 'Setting Updated sucessfully',
        sucess: true,
        body: user?.SecurityProfile
    })
})