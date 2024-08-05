import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';

import { deleteUser, getUserById } from '../../service/user.service';
import { deleteUserSchema } from '../../validation/user.validation';
import { ErrorCode } from '../../errors/custom.errors';
import { IUserMessage } from '../../middleware/auth';


//@desc delete business
//@method DELETE  /users/:id
//@access private
export const deleteUserHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteUserSchema>["params"], {}, {}>, res: Response) => {
    const existingUser = await getUserById(req.params.id)
    if (!existingUser) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)
    await deleteUser(req.params.id, req.userData?.userId)
    res.json({ success: true, message: "User deleted sucessfully" });
})