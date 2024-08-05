import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { changePermissionHandler, createUserHandler } from "../controller/user";
import { changeActiveSchema, changePermissionSchema, createUserSchema, updateUserProfileSchema } from "../validation/user.validation";
import { getAllUsersHandler } from "../controller/user/get.user.controller";
import { changeActiveStatusHandler } from "../controller/user/soft-delete.user..controller";
import { chageProfileHandler } from "../controller/user/change-profile.user.cintroller";
import { AuthJWT } from "../middleware/auth";
import { guard } from "../middleware/guard";
import { PERMISSIONS } from "../config/permission";
import { getAllActiveUsersHandler } from "../controller/user/get-active.user.controller";


const router = express.Router();

router.post("/",
    AuthJWT,
    guard(PERMISSIONS["users:write"]),
    validateSchema(createUserSchema),
    createUserHandler)

router.get("/",
    AuthJWT,
    guard(PERMISSIONS["users:view"]),
    getAllUsersHandler)

router.get("/active",
    AuthJWT,
    guard(PERMISSIONS["users:view"]),
    getAllActiveUsersHandler)

// related to the staffts
router.patch("/:id/change-permission",
    AuthJWT,
    guard(PERMISSIONS["users:edit"]),
    validateSchema(changePermissionSchema),
    changePermissionHandler)

router.patch("/:id/change-active",
    AuthJWT,
    guard(PERMISSIONS["users:edit"]),
    validateSchema(changeActiveSchema),
    changeActiveStatusHandler)

router.patch("/:id/change-profile",
    AuthJWT,
    guard(PERMISSIONS["users:edit"]),
    validateSchema(updateUserProfileSchema),
    chageProfileHandler)







export default router;
