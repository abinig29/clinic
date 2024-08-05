import express from "express";

import validateSchema from "../middleware/validate-schema.middleware";
import { AuthJWT } from "../middleware/auth";
import { clearLoginLogHandler, getLoginLogHandler, updateNotifyNeLoginHandler, updateSaveLogHandler } from "../controller/security-profile";
import { updateNotifyNewLoginSchema, updateSaveLogSchema } from "../validation/security-profile.validation";
import { softDeleteAccountHandler } from "../controller/security-profile/delete-account.security-profile.controller";


const router = express.Router();


/*  get login logs for the user  */
router.get("/login-log", AuthJWT, getLoginLogHandler)
/*  delete all the login log */
router.delete("/login-log", AuthJWT, clearLoginLogHandler)
/*  change setting which is for notify new login from different browser */
router.patch("/notify-new-login", AuthJWT, validateSchema(updateNotifyNewLoginSchema), updateNotifyNeLoginHandler)
/*   change setting which is for save login logs */
router.patch("/save-login", AuthJWT, validateSchema(updateSaveLogSchema), updateSaveLogHandler)
/*  soft delete account */
router.patch("/delete-account", AuthJWT, softDeleteAccountHandler)







export default router;
