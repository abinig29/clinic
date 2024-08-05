

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllPermissionGroups } from '../../service/permission-group.service';
import { IUserMessage } from '../../middleware/auth';
import { getProfile } from '../../service/profile.service';



//@desc get profile of logged in user
//@method GET  /permission-group
//@access private
const getProfileHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const profile = await getProfile(req.userData?.userId)
    res.status(200).json({
        success: true,
        data: profile,
    })
})

export { getProfileHandler };
