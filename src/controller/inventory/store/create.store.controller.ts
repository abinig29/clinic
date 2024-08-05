import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';

import { saveStore } from '../../../service/inventory/store.inventory.service';
import { createStoreInput } from '../../../validation/store.validation';




const createStoreHandler = asyncHandler(async (req: IUserMessage<{}, {}, createStoreInput>, res: Response) => {

    const response = await saveStore(req.body)
    res.status(201).json({
        message: 'Store created sucessfully',
        data: response,
        success: true
    });
})
export { createStoreHandler };
