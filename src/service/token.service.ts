import jwt, { JwtPayload } from "jsonwebtoken";
import { validateEnv } from "../config/config";
import { prisma } from "../config/prisma";
import dayjs, { Dayjs } from "dayjs";
import { extractTokenfromHeader } from "../utils/util";
import { Request } from "express";
import UnAuthenticatedError from "../errors/unauthenticatedError";
import { ErrorCode } from "../errors/custom.errors";
import { getUserById } from "./user.service";
import NotFoundError from "../errors/notFound.errors";
import { UserDataType } from "../middleware/auth";
import { Token } from "@prisma/client";



const jwtconfig = validateEnv()?.jwt


export function signJwt(
    object: Object,
    signKey: string,
    options?: jwt.SignOptions | undefined
) {
    return jwt.sign(object, signKey, {
        ...(options && options),
    });
}


const saveToken = async (token: string, userId: string, expires: Dayjs, blacklisted = false) => {
    const newToken = await prisma.token.create({
        data: {
            token,
            expires: expires.toDate(),
            userId,
            blacklisted
        },
    });
    return newToken

};


const getToken = async (token: Partial<Token>) => {
    return await prisma.token.findFirst({
        where: {
            token: token.id,
            userId: token.userId,
            blacklisted: token.blacklisted,
        },
    });
}

// export const verifyToken = async (token, type) => {

//     const payload = jwt.verify(token, jwtconfig.accessSecret);
//     const tokenDoc = await Token.findOne({
//         token,
//         user: payload.sub,
//         type,
//         blacklisted: false,
//     });
//     if (!tokenDoc) {
//         throw new Error('Token not found');
//     }
//     return tokenDoc;
// };

export const verifyToken = async (req: Request) => {

    try {
        const token = extractTokenfromHeader(req)
        if (!token) throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
        const decode = jwt.verify(token, jwtconfig?.refreshSecret)
        const { userId } = decode as UserDataType;
        const userExist = await getUserById(userId)
        if (!userExist) throw new NotFoundError("Unauthorized", ErrorCode.USER_NOT_FOUND);
        const tokenDoc = await getToken({ userId: userExist?.id, token, blacklisted: false })
        if (!tokenDoc) {
            throw new NotFoundError("Unauthorized", ErrorCode.USER_NOT_FOUND);
        }
        return { tokenDoc, userExist }
    } catch (error) {
        throw new UnAuthenticatedError("User session has ended", ErrorCode.SESSION_ENDED)
    }

}

export const removeToken = async (userId: string) => {
    return await prisma.token.delete({
        where: { userId: userId }
    })
}

export const generateAuthTokens = async (userId: string) => {
    const accessToken = signJwt(
        { userId },
        jwtconfig?.accessSecret,
        { expiresIn: `${jwtconfig?.accessExpirationMinutes}m` }
    );
    const refreshTokenExpires = dayjs().add(
        +jwtconfig?.refreshExpirationDays,
        'days',
    );
    const refreshToken = signJwt(
        { userId },
        jwtconfig?.refreshSecret,
        { expiresIn: `${jwtconfig?.refreshExpirationDays}d` }
    );
    const previosToken = await getToken({ userId: userId })
    if (previosToken)
        await removeToken(userId)
    await saveToken(
        refreshToken,
        userId,
        refreshTokenExpires,
    );
    return { accessToken, refreshToken };
};
