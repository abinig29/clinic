import { NextFunction, Request, Response } from "express";
import config from 'config';
import CustomAPIError from "../errors/custom.errors";
import { validateEnv } from "../config/config";
import { logger } from "../utils/logger";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const nodeEnv = validateEnv()?.env;
    const message = err.message || "Something went wrong, try again later"
    const defaultError = {
        statusCode: err.statusCode || 500,
        msg: message,
        errorCode: err.errorCode ?? 0,
        errors: err.errors ?? null
    };

    res.locals.errorMessage = message;
    if (err instanceof CustomAPIError) {
        return res
            .status(defaultError.statusCode)
            .json({ message: defaultError.msg, sucess: false, ...(nodeEnv === 'development' && { stack: err.stack }), errorCode: defaultError?.errorCode, errors: defaultError?.errors });
    }




    if (err.name === "ValidationError") {
        defaultError.statusCode = 500;
        defaultError.msg = Object.values(err.errors)
            .map((item: { message: string }) => item?.message)
            .join(",");
    }
    if (err.name === 'CastError') {
        defaultError.statusCode = 400;
        defaultError.msg = `Resourse not found. Invalid :${err.path}`;
    }

    if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    // logger.info(defaultError.msg)
    console.log(defaultError.msg)
    res
        .status(defaultError.statusCode)
        .json({ message: defaultError.msg, sucess: false, ...(nodeEnv === 'development' && { stack: err.stack }), });
};





export default errorHandlerMiddleware;
