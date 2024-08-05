import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';

import { loginUserInput } from "../../validation/auth.validation";
import { loginUser } from "../../service/auth.service";
import { generateAuthTokens } from "../../service/token.service";
import { validateEnv } from "../../config/config";
import { saveLoginAcitivy, setFingerprintHash } from "../../service/security-profile.profile";
import { sendMail } from "../../utils/send-mail";
import { logger } from "../../utils/logger";
import { sendNotification } from "../../service/notification.sesrvice";



//@desc  login user
//@method POST  /auth/login
//@access public
export const loginHandler = asyncHandler(async (req: Request<object, object, loginUserInput>, res: Response) => {
    const env = validateEnv()
    const { emailOrPhone, password } = req.body
    const user = await loginUser({
        emailOrPhone,
        password,
        fingerprintHash: req.fingerprint.hash,
    }
    );


    const ipAddress = req.socket?.remoteAddress ?? "Cant find ip"

    if (user?.SecurityProfile.notifyOnNewBrowserLogin) {
        const sameBrowser = req.fingerprint.hash === user?.SecurityProfile?.fingerprintHash
        if (!sameBrowser) {
            logger.info("New Login")
            // TO DO send mail to user 
            await sendNotification({
                recipientId: user?.id,
                title: "Suspicious Activity ",
                content: `A recent sign-in to your account from an unknown device or browser.`,
            })
        }
    }
    if (user.SecurityProfile?.saveActivityLog)
        saveLoginAcitivy({ ipAddress, userAgent: req.headers['user-agent'] }, user?.id)

    const { refreshToken, accessToken } = await generateAuthTokens(user.id);



    res.cookie("Jwt", refreshToken, {
        httpOnly: true,
        secure: env?.env !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * +env?.jwt?.refreshExpirationDays,
    });
    res.status(201).json({
        success: true,
        data: {
            user,
            accessToken,
            refreshToken
        }
    })

}) 