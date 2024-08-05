
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { createVendorSchema, deleteVendorSchema, updateVendorSchema } from "../validation/vendor.validation"
import { createVendorHandler, deleteVendorHandler, getVendorHandler, updateVendorHandler } from "../controller/inventory/vendor";


const router = express.Router();

router.post("/",
    AuthJWT,
    validateSchema(createVendorSchema),
    createVendorHandler)

router.get("/",
    AuthJWT,
    getVendorHandler)

router.patch("/:id",
    AuthJWT,
    validateSchema(updateVendorSchema),
    updateVendorHandler)

router.delete("/:id",
    AuthJWT,
    validateSchema(deleteVendorSchema),
    deleteVendorHandler)



export default router;
