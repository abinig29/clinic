import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { forgotPasswordInput } from "../../validation/auth.validation";
import { getUserByEmail } from "../../service/user.service";
import { ErrorCode } from "../../errors/custom.errors";
import { forgotPasswordUser } from "../../service/auth.service";


//@desc forgot passowrd for customer
//@method POST  /auth/forgetPassword
//@access public
export const forgotPasswordHandler = asyncHandler(
    async (
        req: Request<{}, {}, forgotPasswordInput>,
        res: Response
    ) => {
        const message = "If a user is registered with the provided email address, you will receive a password reset OTP."
        const { email } = req.body;
        const user = await getUserByEmail({ email, includeProfile: true })
        if (!user) {
            throw new NotFoundError("User not found", ErrorCode?.USER_NOT_FOUND)
        }
        const updateUser = await forgotPasswordUser(user)
        res.status(201).json({ message, data: { email }, success: true, })
    }


)