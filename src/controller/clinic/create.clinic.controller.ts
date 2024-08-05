import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createPermissionGroupInputType } from '../../validation/permission-group.validation';
import { IUserMessage } from '../../middleware/auth';
import { savePermissionGroup } from '../../service/permission-group.service';
import { createClinicInput } from '../../validation/clinic.validation';
import { createClinic, getClinic } from '../../service/clinic.service';
import { getUserById, updateUser } from '../../service/user.service';
import BadRequestError from '../../errors/badRequest.errors';
import { ErrorCode } from '../../errors/custom.errors';



//@desc create  clinic
//@method POST  /clinic
//@access private

const createClinicHandler = asyncHandler(async (req: IUserMessage<{}, {}, createClinicInput>, res: Response) => {
    const userId = req.userData?.userId
    const clinic = await getClinic()
    if (clinic) throw new BadRequestError("Clinic Already exists", ErrorCode.CLINIC_ALREADY_EXIST)
    const response = await createClinic({
        clinic: { ...req.body },
        ownerId: userId
    })
    const loggedInUser = await getUserById(userId)
    if (loggedInUser.firstTimeLogin)
        await updateUser(userId, { firstTimeLogin: false })
    res.status(201).json({
        message: 'Clinic created sucessfully',
        data: response,
        success: true
    });
})
export { createClinicHandler };
