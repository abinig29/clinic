
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getAllLoginLog, softDeleteAccount } from '../../service/security-profile.profile';
import { IUserMessage } from '../../middleware/auth';



//@desc delete account
//@method GET  /delete-account
//@access private
const softDeleteAccountHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const deletedAccount = await softDeleteAccount(req.userData?.userId)
    res.status(200).json({
        success: true,
        message: "Account deleted"
    })
})

export { softDeleteAccountHandler };
