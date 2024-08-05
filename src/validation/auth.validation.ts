import { object, string, TypeOf, date, array, number, boolean } from "zod";


/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - emailOrPhone
 *        - password
 *      properties:
 *        emailOrPhone:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string     
 *            phoneNumber:
 *              type: string
 *            email:
 *              type: string     
 *            role:
 *              type: string
 *            firstTimeLogin:
 *              type: boolean
 */



export const loginUserSchema = object({
    body: object({
        emailOrPhone: string({ required_error: "Should have email or phone number" }),
        password: string({ required_error: "Should have password" }),
    })
});
export const ForgotPasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),

    })
});
export const ResetPasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),
        passwordResetCode: string({ required_error: "Should have password reset code" }),
        password: string({ required_error: "Should have password" }),

    })
});
export const changePasswordSchema = object({
    body: object({
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),
        password: string({ required_error: "Should have password" }),

    })
});
export const changeOldPasswordSchema = object({
    body: object({
        newPassword: string({ required_error: "Should have new password" }),
        oldPassword: string({ required_error: "Should have old password" }),


    })
});






export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
export type forgotPasswordInput = TypeOf<typeof ForgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof ResetPasswordSchema>["body"];
export type changePasswordInput = TypeOf<typeof changePasswordSchema>["body"];
export type changeOldPasswordInput = TypeOf<typeof changeOldPasswordSchema>["body"];







