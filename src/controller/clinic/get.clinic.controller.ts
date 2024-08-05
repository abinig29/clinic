import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getClinic } from '../../service/clinic.service';



//@desc get all clinic
//@method GET  /clinic
//@access private
const getClinicHandler = asyncHandler(async (req: Request, res: Response) => {
    const clinic = await getClinic()
    console.log(clinic, "hi")
    res.status(200).json({
        success: true,
        data: clinic,
    })
})

export { getClinicHandler };
