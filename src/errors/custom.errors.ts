class CustomAPIError extends Error {
    message: string
    errorCode: ErrorCode
    statusCode: number
    error: any
    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any) {
        super(message);
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.error = error
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    WRONG_CREDENTIAL = 1002,
    USER_ALREADY_REGISTERED = 1003,
    USER_ACCOUNT_DEACTIVATED = 1004,
    TOO_MANY_REQUEST = 1005,
    ADMIN_NOT_FOUND = 1006,

    SESSION_ENDED = 2000,
    VERIFICATION_CODE_EXPIRE = 2001,
    TOKEN_NOT_FOUND = 2003,
    TOKEN_EXPIRE = 2004,
    NO_PERMISSION = 2005,


    PERMISSION_GROUP_NOT_FOUND = 3000,


    CLINIC_NOT_FOUND = 4000,
    CLINIC_ALREADY_EXIST = 4001,
    BRANCH_NOT_FOUND = 4002,
    PATIENT_NOT_FOUND = 4003,
    DIAGNOSIS_NOT_FOUND = 4004,
    DOCTOR_ALREADY_BOOKED = 4005,


    WORKSPACE_NOT_FOUND = 5000,
    STORE_NOT_FOUND = 5001,
    CATEGORY_NOT_FOUND = 5003,
    ITEM_NOT_FOUND = 5004,
    NOT_ENOUGH_ITEM_FOUND = 5005,
    VENDOR_NOT_FOUND = 5006,

}
export default CustomAPIError;
