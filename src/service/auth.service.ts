import { Profile, User } from "@prisma/client";
import { validateEnv } from "../config/config";
import BadRequestError from "../errors/badRequest.errors";
import { ErrorCode } from "../errors/custom.errors";
import NotFoundError from "../errors/notFound.errors";
import { generateVerificationCode } from "../utils/util";
import { getUserByEmail, getUserByEmailOrPhone, getUserWithAllIncluded, updateUser } from "./user.service";
import bcryptjs from 'bcryptjs'
import { sendMail } from "../utils/send-mail";
import { generateAuthTokens, removeToken, verifyToken } from "./token.service";
import { Request } from "express";
import { setFingerprintHash } from "./security-profile.profile";


export const loginUser = async ({ emailOrPhone, password, fingerprintHash, }: { emailOrPhone: string, password: string, fingerprintHash?: string }) => {
    const user = await getUserByEmailOrPhone(emailOrPhone);
    if (user?.SecurityProfile?.softDeleted) throw new BadRequestError("Your account has been deactivated. Contact administrator. ", ErrorCode?.USER_ACCOUNT_DEACTIVATED)
    if (!user) throw new NotFoundError("User not found", ErrorCode?.USER_NOT_FOUND)
    const match = await bcryptjs.compare(password, user.password);
    if (!match) throw new BadRequestError("Invalid credential", ErrorCode.WRONG_CREDENTIAL);
    if (user.firstTimeLogin) {
        await setFingerprintHash(user?.id, fingerprintHash)
    }
    return await getUserWithAllIncluded({ id: user?.id }, {});
};

export const compareAndGeneratePassword = async ({ password, oldPassword, newPassword }: { password: string, oldPassword: string, newPassword }) => {
    const match = await bcryptjs.compare(password, oldPassword);
    if (!match) throw new BadRequestError("Invalid credential", ErrorCode.WRONG_CREDENTIAL);
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(newPassword, salt)
    return hashPassword
}


export const forgotPasswordUser = async (user: User & { profile: Profile }) => {
    const env = validateEnv()
    const code = generateVerificationCode(6)
    const verificationExpires = parseInt(env.verificationCodeExpire ?? "10") * 1000 * 60
    const updatedUser = await updateUser(user?.id, {
        passwordResetCode: code,
        // @ts-ignore
        verificationCodeExpires: Date.now() + verificationExpires
    })
    await sendMail({
        email: user?.email,
        subject: "Password reset code",
        template: "passwordReset.mails.ejs",
        data: {
            user: user.profile?.fullName,
            code,
        },
    });
    return updatedUser
}

export const resetPassword = async ({ email, passwordResetCode, password }: { email?: string, passwordResetCode?: string, password?: string }) => {
    const user = await getUserByEmail({ email: email })
    if (
        !user ||
        !user.passwordResetCode ||
        user.passwordResetCode !== passwordResetCode ||
        user.verificationCodeExpires < Date.now()
    ) {
        throw new BadRequestError('Could not reset user password', ErrorCode.VERIFICATION_CODE_EXPIRE)
    }
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)
    return await updateUser(user?.id, { password: hashPassword, passwordResetCode: null })
}


export const refreshAuthToken = async (req: Request) => {
    const { tokenDoc } = await verifyToken(req);
    await removeToken(tokenDoc.id);
    return generateAuthTokens(tokenDoc.userId);
};
