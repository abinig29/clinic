import asyncHandler from 'express-async-handler';
import { Response } from "express";
import NotFoundError from '../../../errors/notFound.errors';
import { z } from 'zod';
import { ErrorCode } from '../../../errors/custom.errors';
import { IUserMessage } from '../../../middleware/auth';
import { deletevendor, getvendorById } from '../../../service/inventory/vendor.inventory.service';
import { deleteVendorSchema } from '../../../validation/vendor.validation';



export const deleteVendorHandler = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteVendorSchema>["params"], {}, {}>, res: Response) => {
    const existingVendor = await getvendorById(req.params.id)
    if (!existingVendor) throw new NotFoundError("Vendor not found", ErrorCode.VENDOR_NOT_FOUND)
    await deletevendor(req.params.id)
    res.status(204).json({ success: true, message: "Vendor deleted sucessfully" });
})