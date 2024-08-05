import CustomAPIError, { ErrorCode } from "./custom.errors";

class TooManyRequest extends CustomAPIError {
    statusCode: number;
    constructor(message: string,) {
        super(message, ErrorCode.TOO_MANY_REQUEST, 404, null);
        this.statusCode = 404;
    }
}

export default TooManyRequest;
