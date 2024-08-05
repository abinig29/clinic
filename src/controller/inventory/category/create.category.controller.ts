import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../../middleware/auth';
import { createCategoryInput } from '../../../validation/inventory-category.validation';
import { saveCategory } from '../../../service/inventory/category.inventory.service';




const createCategoryHandler = asyncHandler(async (req: IUserMessage<{}, {}, createCategoryInput>, res: Response) => {

    const response = await saveCategory(req.body)
    res.status(201).json({
        message: 'Category created sucessfully',
        data: response,
        success: true
    });
})
export { createCategoryHandler };
