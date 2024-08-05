
import express from "express";
import { createPermissionGroupSchema, deletePermissionGroupSchema, updatePermissionGroupSchema } from "../validation/permission-group.validation";
import { createPermissionGroupHandler, deletePermissionGroupHandler, getPermissionGroupsHandler, updatePermissionGroupHandler } from "../controller/permission-group";
import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";

const router = express.Router();

router.post("/",
    AuthJWT,
    guard(PERMISSIONS["role:write"]),
    validateSchema(createPermissionGroupSchema),
    createPermissionGroupHandler)

router.get("/",
    AuthJWT,
    guard(PERMISSIONS["role:view"]),
    getPermissionGroupsHandler)

router.patch("/:id",
    AuthJWT,
    guard(PERMISSIONS["role:edit"]),
    validateSchema(updatePermissionGroupSchema),
    updatePermissionGroupHandler)

router.delete("/:id",
    AuthJWT,
    guard(PERMISSIONS["role:delete"]),
    validateSchema(deletePermissionGroupSchema),
    deletePermissionGroupHandler)



export default router;
