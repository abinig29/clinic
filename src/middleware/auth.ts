// import { NextFunction, Request, Response } from "express";

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticatedError";
import ForbiddenError from "../errors/forbidden.errors";
import { ErrorCode } from "../errors/custom.errors";
import { validateEnv } from "../config/config";
import { getUserById } from "../service/user.service";
import { Permission, User } from "@prisma/client";
import { extractTokenfromHeader } from "../utils/util";
import NotFoundError from "../errors/notFound.errors";



export interface UserDataType {
  userId: string;
  permission?: Permission
}
export interface IUserMessage<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
  userData: UserDataType;
}

type ExtendedUser = User & {
  permission?: Permission
}


export const AuthJWT = (
  req: IUserMessage,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtconfig = validateEnv()?.jwt
    const token = extractTokenfromHeader(req)
    if (!token) throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
    jwt.verify(token, jwtconfig?.accessSecret, async (err, decoded) => {
      if (err) return next(new ForbiddenError("Token expires", ErrorCode?.TOKEN_EXPIRE));
      const decodeData = decoded as UserDataType;
      const userWithPermission: ExtendedUser = await getUserById(decodeData?.userId, true)
      if (!userWithPermission) throw new NotFoundError("User not found", ErrorCode.USER_NOT_FOUND)
      req.userData = {
        userId: decodeData?.userId,
        permission: userWithPermission?.permission
      }
      next();
    });

  } catch (err) {
    throw new UnAuthenticatedError("Provide token", ErrorCode.TOKEN_NOT_FOUND);
  }
};


