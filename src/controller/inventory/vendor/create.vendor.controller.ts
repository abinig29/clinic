import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';

import { createVendorInput } from '../../../validation/vendor.validation';
import { savevendor } from '../../../service/inventory/vendor.inventory.service';




const createVendorHandler = asyncHandler(async (req: IUserMessage<{}, {}, createVendorInput>, res: Response) => {

    const response = await savevendor(req.body)
    res.status(201).json({
        message: 'Vendor created sucessfully',
        data: response,
        success: true
    });
})
export { createVendorHandler };
