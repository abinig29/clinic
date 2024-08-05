
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";
import { createBranchHandler, deleteBranchHandler, getBranchesHandler, updateBranchHandler } from "../controller/branch";
import { createBranchSchema, deleteBranchSchema, updateBranchSchema } from "../validation/branch.validation";


const router = express.Router();

router.post("/",
    AuthJWT,
    guard(PERMISSIONS["branch:write"]),
    validateSchema(createBranchSchema),
    createBranchHandler)

router.get("/", getBranchesHandler)

router.patch("/:id",
    AuthJWT,
    guard(PERMISSIONS["branch:edit"]),
    validateSchema(updateBranchSchema),
    updateBranchHandler)

router.delete("/:id",
    AuthJWT,
    guard(PERMISSIONS["branch:delete"]),
    validateSchema(deleteBranchSchema),
    deleteBranchHandler)



export default router;
