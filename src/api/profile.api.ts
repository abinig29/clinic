
import express from "express";
import { createPermissionGroupSchema, deletePermissionGroupSchema, updatePermissionGroupSchema } from "../validation/permission-group.validation";
import { createPermissionGroupHandler, deletePermissionGroupHandler, getPermissionGroupsHandler, updatePermissionGroupHandler } from "../controller/permission-group";
import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";
import { getProfileHandler } from "../controller/profile/get.profile.controller";
import { updateProfileSchema } from "../validation/profile.validation";

const router = express.Router();

router.get("/",
    AuthJWT,
    getProfileHandler)

router.patch("/",
    AuthJWT,
    validateSchema(updateProfileSchema),
    getPermissionGroupsHandler)



export default router;
