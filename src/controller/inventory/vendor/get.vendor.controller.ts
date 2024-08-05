import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { getvendors } from '../../../service/inventory/vendor.inventory.service';


const getVendorHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const vendors = await getvendors()
    res.status(200).json({
        success: true,
        data: vendors,
    })
})

export { getVendorHandler };
