import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { getStoreById } from '../../../service/inventory/store.inventory.service';
import NotFoundError from '../../../errors/notFound.errors';
import { ErrorCode } from '../../../errors/custom.errors';
import { createInventoryItemInput, createInventoryItemSchema } from '../../../validation/inventory-item.validation';
import { saveInventoryItem } from '../../../service/inventory/item.inventory.service';
import { z } from 'zod';






const createInventoryItemHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof createInventoryItemSchema>["params"], {}, createInventoryItemInput>, res: Response) => {
    const storeId = req.params.storeId
    const Store = await getStoreById(storeId)
    if (!Store) throw new NotFoundError('Store not found', ErrorCode.STORE_NOT_FOUND)

    const response = await saveInventoryItem({ ...req.body, storeId })
    res.status(201).json({
        message: 'InventoryItem created sucessfully',
        data: response,
        success: true
    });
})
export { createInventoryItemHandler };
