import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { getCategorys } from '../../../service/inventory/category.inventory.service';


const getCategoryHandler = asyncHandler(async (req: IUserMessage, res: Response) => {
    const categories = await getCategorys()
    res.status(200).json({
        success: true,
        data: categories,
    })
})

export { getCategoryHandler };
