import { Request, Response } from "express";
import NotFoundError from "../../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../../errors/custom.errors";
import { updateInventoryItemInput, updateInventoryItemSchema } from "../../../validation/inventory-item.validation";
import { getInventoryItemyId, updateItem } from "../../../service/inventory/item.inventory.service";



export const updateInventoryItemHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateInventoryItemSchema>["params"], {}, updateInventoryItemInput>, res: Response) => {
    const itemId = req.params.id
    const inventoryItem = await getInventoryItemyId(itemId)
    if (!inventoryItem) throw new NotFoundError('Inventory Item Not found', ErrorCode.ITEM_NOT_FOUND)

    const updatedItem = await updateItem(itemId, req.body)
    res.status(200).json({
        message: 'Inventory Item Updated Sucessfully',
        sucess: true,
        body: updatedItem
    })
})