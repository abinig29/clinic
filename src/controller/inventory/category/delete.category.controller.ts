import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../../errors/custom.errors';
import { IUserMessage } from '../../../middleware/auth';
import { deleteCategorySchema } from '../../../validation/inventory-category.validation';
import { deleteCategory, getCategoryById } from '../../../service/inventory/category.inventory.service';



export const deleteCategoryHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteCategorySchema>["params"], {}, {}>, res: Response) => {
    const existingCategory = await getCategoryById(req.params.id)
    if (!existingCategory) throw new NotFoundError("Category not found", ErrorCode.CATEGORY_NOT_FOUND)
    await deleteCategory(req.params.id)
    res.status(204).json({ success: true, message: "Category deleted sucessfully" });
})