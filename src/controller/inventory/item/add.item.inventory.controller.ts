import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { getStoreById } from '../../../service/inventory/store.inventory.service';
import NotFoundError from '../../../errors/notFound.errors';
import { ErrorCode } from '../../../errors/custom.errors';
import { addInventoryItemInput, addInventoryItemSchema, } from '../../../validation/inventory-item.validation';
import { addInventory } from '../../../service/inventory/item.inventory.service';
import { z } from 'zod';






const addInventoryItemHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof addInventoryItemSchema>["params"], {}, addInventoryItemInput>, res: Response) => {
    const storeId = req.params.storeId
    const Store = await getStoreById(storeId)
    if (!Store) throw new NotFoundError('Store not found', ErrorCode.STORE_NOT_FOUND)

    const response = await addInventory(req.body.productId, req.body.amount, storeId, req.body.userId)
    res.status(201).json({
        message: 'Inventory Item added sucessfully',
        data: response,
        success: true
    });
})
export { addInventoryItemHandler };
