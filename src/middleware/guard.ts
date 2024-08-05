import { NextFunction, Request, Response } from "express";
import { IUserMessage } from "./auth";
import ForbiddenError from "../errors/forbidden.errors";
import { ErrorCode } from "../errors/custom.errors";

export const guard = (permission: string) => {
    return (req: IUserMessage, res: Response, next: NextFunction) => {
        const permissions = req.userData?.permission
        const branchId = req.headers["x-branch-id"] as string
        if ((permissions?.permissions?.includes(permission) && permissions.branchId.includes(branchId))
            || permissions?.grantAll) {
            next()
        }
        else {
            throw new ForbiddenError("Resource Unavailable", ErrorCode.NO_PERMISSION)
        }
    }

} 