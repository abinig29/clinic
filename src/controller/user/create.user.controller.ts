import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../errors/notFound.errors';
import { createUser } from '../../service/user.service';
import { ErrorCode } from '../../errors/custom.errors';
import { createUserInput } from '../../validation/user.validation';
import { hashPassowrd } from '../../utils/bycrpt';
import { IUserMessage } from '../../middleware/auth';
import { getPermissionGroupById } from '../../service/permission-group.service';
import { sendMail } from '../../utils/send-mail';



//@desc create  user
//@method POST  /users
//@access private
const createUserHandler = asyncHandler(async (req: IUserMessage<{}, {}, createUserInput>, res: Response) => {
    const { password, phoneNumber } = req.body.user
    const { roleId, branchId } = req.body.permission
    const hashedPassword = await hashPassowrd(password)
    const role = await getPermissionGroupById(roleId)
    if (!role) throw new NotFoundError("Permission group not found", ErrorCode.PERMISSION_GROUP_NOT_FOUND)

    // TO DO check branch

    const newUser = await createUser(
        phoneNumber,
        role.name,
        { ...req.body.user, password: hashedPassword },
        { branchId, permissions: role.permissions, grantAll: role.grantAll },
        { ...req.body.profile }
    )
    delete newUser?.password
    delete newUser?.passwordResetCode

    // TO DO send mail

    // await sendMail({
    //     email: req.body.email,
    //     subject: "Password for your account",
    //     template: "passwordUser.mails.ejs",
    //     data: {
    //         user: req.body.fullName,
    //         password: hashPassowrd,
    //     },
    // });
    res.status(201).json({
        message: 'User created sucessfully',
        data: newUser,
        success: true
    });
})
export { createUserHandler };
