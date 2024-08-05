import { Request, Response } from "express";
import NotFoundError from "../../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../../errors/custom.errors";
import { updateCategoryInput, updateCategorySchema } from "../../../validation/inventory-category.validation";
import { getCategoryById, updateCategory } from "../../../service/inventory/category.inventory.service";



export const updateCategoryHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateCategorySchema>["params"], {}, updateCategoryInput>, res: Response) => {
    const categoryId = req.params.id
    const category = await getCategoryById(categoryId)
    if (!category) throw new NotFoundError('Category not found', ErrorCode.CATEGORY_NOT_FOUND)

    const updatedCategory = await updateCategory(categoryId, req.body)
    res.status(200).json({
        message: 'Category Updated sucessfully',
        sucess: true,
        body: updatedCategory
    })
})