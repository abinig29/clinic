import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/auth';
import { clearLoginLog } from '../../service/security-profile.profile';


//@desc clear loginlog
//@method DELETE  /login-log/clear
//@access private
export const clearLoginLogHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const deletedPermissionGroup = await clearLoginLog(req.userData.userId)
    if (deletedPermissionGroup)
        res.status(200).json({ success: true, message: "Login activity cleared sucessfully" });
})