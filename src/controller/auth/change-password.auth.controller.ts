import asyncHandler from "express-async-handler";
import { Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import BadRequestError from "../../errors/badRequest.errors";
import { changeOldPasswordInput } from "../../validation/auth.validation";
import { IUserMessage } from "../../middleware/auth";
import { getUserById, updateUser } from "../../service/user.service";
import { compareAndGeneratePassword } from "../../service/auth.service";
import { ErrorCode } from "../../errors/custom.errors";


//@desc  change password of loggedin user
//@method PATCH  /auth/changePassword
//@access protected
export const changePasswordHandler = asyncHandler(async (req: IUserMessage<{}, {}, changeOldPasswordInput>, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req?.userData.userId
    const user = await getUserById(userId)
    if (!user) throw new NotFoundError("User not found ", ErrorCode.USER_NOT_FOUND);
    const hashPassword = await compareAndGeneratePassword({ password: oldPassword, oldPassword: user?.password, newPassword })

    await updateUser(user?.id, { password: hashPassword, firstTimeLogin: true })
    res.status(200).json({ message: "Password updated successfully", success: true });
})