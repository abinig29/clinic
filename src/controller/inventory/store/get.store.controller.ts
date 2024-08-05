import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { getStores } from '../../../service/inventory/store.inventory.service';





const getStoreHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const Stores = await getStores()
    res.status(200).json({
        success: true,
        data: Stores,
    })
})

export { getStoreHandler };
