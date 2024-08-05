import CustomAPIError, { ErrorCode } from "./custom.errors";

class ConflictError extends CustomAPIError {
    statusCode: number;
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 409, null);
        this.statusCode = 409;
    }
}

export default ConflictError;
