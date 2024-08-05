import asyncHandler from "express-async-handler";
import { IUserMessage } from "../../middleware/auth";
import { Response } from "express";
import { getUserById } from "../../service/user.service";
import { ErrorCode } from "../../errors/custom.errors";
import NotFoundError from "../../errors/notFound.errors";
import { updateProfile } from "../../service/profile.service";
import { updateProfileInput } from "../../validation/profile.validation";


//@desc  change profileuser
//@method PATCH  /profile
//@access protected
export const updateProfileHandler = asyncHandler(async (req: IUserMessage<{}, {}, updateProfileInput>, res: Response) => {

    const userId = req?.userData.userId
    const user = await getUserById(userId);
    if (!user) throw new NotFoundError("No user was found", ErrorCode.USER_NOT_FOUND);

    const updatedUser = await updateProfile(userId, { ...req.body })
    res.status(200).json({
        message: "profile change successfully",
        data: updatedUser?.profile,
        success: true
    });
})