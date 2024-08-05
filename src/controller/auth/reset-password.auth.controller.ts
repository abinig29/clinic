import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resetPasswordInput } from "../../validation/auth.validation";
import { resetPassword } from "../../service/auth.service";



//@desc reset password
//@method POST  /auth/resetPassword
//@access public
export const resetPasswordHandler = asyncHandler(async (req: Request<{}, {}, resetPasswordInput>, res: Response) => {
    await resetPassword({ ...req.body })
    res.status(201).json({ message: 'Password updated successfully', sccuses: true });
}

) 