import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllPermissionGroups } from '../../service/permission-group.service';
import { getAllLoginLog } from '../../service/security-profile.profile';
import { IUserMessage } from '../../middleware/auth';



//@desc get all login activity logs
//@method GET  /login-log
//@access private
const getLoginLogHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const loginLogs = await getAllLoginLog(req.userData?.userId)
    res.status(200).json({
        success: true,
        data: loginLogs,
    })
})

export { getLoginLogHandler };
