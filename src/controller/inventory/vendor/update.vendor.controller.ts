import { Request, Response } from "express";
import NotFoundError from "../../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { ErrorCode } from "../../../errors/custom.errors";
import { updateVendorInput, updateVendorSchema } from "../../../validation/vendor.validation";
import { getvendorById, updatevendor } from "../../../service/inventory/vendor.inventory.service";



export const updateVendorHandler = asyncHandler(async (req: Request<z.TypeOf<typeof updateVendorSchema>["params"], {}, updateVendorInput>, res: Response) => {
    const VendorId = req.params.id
    const Vendor = await getvendorById(VendorId)
    if (!Vendor) throw new NotFoundError('Vendor not found', ErrorCode.VENDOR_NOT_FOUND)

    const updatedVendor = await updatevendor(VendorId, req.body)
    res.status(200).json({
        message: 'Vendor Updated sucessfully',
        sucess: true,
        body: updatedVendor
    })
})