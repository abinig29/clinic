import express from "express";


import validateSchema from "../middleware/validate-schema.middleware";
import { ForgotPasswordSchema, ResetPasswordSchema, changeOldPasswordSchema, changePasswordSchema, loginUserSchema } from "../validation/auth.validation";
import { changePasswordHandler, forgotPasswordHandler, loginHandler, logout, refreshTokenHandler, resetPasswordHandler } from "../controller/auth";
import { AuthJWT } from "../middleware/auth";
import { loginLimiter } from "../middleware/auth-limmter";


const router = express.Router();




/**
 * @openapi
 * '/api/v1/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 */

router.post("/login", loginLimiter, validateSchema(loginUserSchema), loginHandler);
router.post("/forgotPassword", loginLimiter, validateSchema(ForgotPasswordSchema), forgotPasswordHandler)
router.post("/resetPassword", validateSchema(ResetPasswordSchema), resetPasswordHandler)
router.post("/logout", logout);
router.post("/refresh", refreshTokenHandler)
router.patch("/changePassword", AuthJWT, validateSchema(changeOldPasswordSchema), changePasswordHandler)




export default router;
