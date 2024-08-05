import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { z } from 'zod';

import { getInventoryItembyId } from '../../../service/inventory/item.inventory.service';
import { getInventoryItemByIdSchema } from '../../../validation/inventory-item.validation';
import { IUserMessage } from '../../../middleware/auth';


const getItemByIdHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof getInventoryItemByIdSchema>["params"]>, res: Response) => {

    const item = await getInventoryItembyId(req.params.id,)
    res.status(200).json({
        success: true,
        data: item,
    })
})

export { getItemByIdHandler };

