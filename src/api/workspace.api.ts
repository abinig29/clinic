
import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { createWorkspaceSchema, deleteWorkspaceSchema, kickoutUerfromWorkspaceSchema, updateWorkspaceSchema } from "../validation/workspace.validation";
import { createWorkspaceHandler, deleteWorkspaceHandler, getWorkspaceHandler, inviteUserToWorkspaceHandler, kickOutUserToWorkspaceFromWorkspaceHandler, updateWorkspaceHandler } from "../controller/workspace";


const router = express.Router();

router.post("/",
    AuthJWT,
    validateSchema(createWorkspaceSchema),
    createWorkspaceHandler)
router.get("/", AuthJWT, getWorkspaceHandler)
router.patch("/:id", AuthJWT, validateSchema(updateWorkspaceSchema), updateWorkspaceHandler)
router.patch("/:id/invite-user", AuthJWT, validateSchema(kickoutUerfromWorkspaceSchema), inviteUserToWorkspaceHandler)
router.patch("/:id/kickout-user", AuthJWT, validateSchema(kickoutUerfromWorkspaceSchema), kickOutUserToWorkspaceFromWorkspaceHandler)
router.delete("/:id", AuthJWT, validateSchema(deleteWorkspaceSchema), deleteWorkspaceHandler)



export default router;
