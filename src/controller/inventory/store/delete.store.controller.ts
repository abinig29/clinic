import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../../errors/custom.errors';
import { IUserMessage } from '../../../middleware/auth';
import { deleteStroreSchema } from '../../../validation/store.validation';
import { deleteStore, getStoreById } from '../../../service/inventory/store.inventory.service';



export const deleteStroreHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteStroreSchema>["params"], {}, {}>, res: Response) => {
    const existingStrore = await getStoreById(req.params.id)
    if (!existingStrore) throw new NotFoundError("Strore not found", ErrorCode.STORE_NOT_FOUND)
    await deleteStore(req.params.id)
    res.status(204).json({ success: true, message: "Strore deleted sucessfully" });
})