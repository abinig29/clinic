import { Request, Response } from "express";
import NotFoundError from "../../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../../errors/custom.errors";
import { updateStoreInput, updateStoreSchema } from "../../../validation/store.validation";
import { getStoreById, updateStore } from "../../../service/inventory/store.inventory.service";






export const updateStoreHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateStoreSchema>["params"], {}, updateStoreInput>, res: Response) => {
    const StoreId = req.params.id
    const Store = await getStoreById(StoreId)
    if (!Store) throw new NotFoundError('Store not found', ErrorCode.STORE_NOT_FOUND)

    const updatedStore = await updateStore(StoreId, req.body)
    res.status(200).json({
        message: 'Store Updated sucessfully',
        sucess: true,
        body: updatedStore
    })
})