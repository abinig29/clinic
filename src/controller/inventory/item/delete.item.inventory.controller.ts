import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../../errors/custom.errors';
import { IUserMessage } from '../../../middleware/auth';
import { deleteInventory, getInventoryItemyId } from '../../../service/inventory/item.inventory.service';
import { deleteInventoryItemSchema } from '../../../validation/inventory-item.validation';




export const deleteInventoryHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteInventoryItemSchema>["params"], {}, {}>, res: Response) => {
    const existingInventory = await getInventoryItemyId(req.params.id)
    if (!existingInventory) throw new NotFoundError("Inventory not found", ErrorCode.ITEM_NOT_FOUND)
    await deleteInventory(req.params.id)
    res.status(204).json({ success: true, message: "Inventory Item Deleted Sucessfully" });
})