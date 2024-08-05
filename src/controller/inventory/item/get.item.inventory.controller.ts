import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getPaginatedInventoryItems } from '../../../service/inventory/item.inventory.service';
import BadRequestError from '../../../errors/badRequest.errors';
import { ErrorCode } from '../../../errors/custom.errors';




const getInventoryItemsHandler = asyncHandler(async (req: Request, res: Response) => {
    const storeId = req.params?.storeId
    if (!storeId) throw new BadRequestError("Havent found any Store", ErrorCode.NO_PERMISSION)
    const respose = await getPaginatedInventoryItems(req.query, storeId)

    res.status(200).json({
        currentPage: respose.currentPage,
        totalItems: respose.totalCount,
        totalPages: respose.totalPages,
        data: respose.items,
        success: true,
    });



})

export { getInventoryItemsHandler };

